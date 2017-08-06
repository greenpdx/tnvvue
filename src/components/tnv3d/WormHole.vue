<template>
  <div class="worm-hole">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <g v-if="show2">
        <polygon :points="hex1.hex.str" fill-opacity="0" stroke="black"/>
        <polygon :points="hex1.mask.top.str" :fill="green" />
        <polygon :points="hex1.mask.bot.str" :fill="green" />
        <text x="300" y="60" >{{ hex1.node.name }}</text>
        <polygon v-for="edge in hex1.edges" :points="edge" fill="black" stroke="black"/>
      </g>
      <g v-if="show1">
        <polygon :points="hex0.hex.str" fill-opacity="0" stroke="black"/>
        <polygon :points="hex0.mask.top.str" :fill="red" />
        <polygon :points="hex0.mask.bot.str" :fill="red" />
        <text x="300" y="20" >{{ hex0.node.name }}</text>
        <polygon v-for="edge in hex0.edges" :points="edge" fill="black" stroke="black"/>
      </g>
    </svg>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const TAU = (Math.sqrt(3) / 2)
const PHI = Math.tan(Math.PI / 6)
const hexBase = [
  {x: -1, y: 0},
  {x: -0.5, y: -TAU},
  {x: 0.5, y: -TAU},
  {x: 1, y: 0},
  {x: 0.5, y: TAU},
  {x: -0.5, y: TAU}
]
/*
  mask0  mask array size 2 from corner to first/largest hex (hex0)
  mask1  mask array size 2 from hex0 to second/smallest hex (hex1)
  hex0        polygon points of first/largest hex
  hex1        polygon points of second/smallest hex
  edge0       array size 6 of edge lines (polygon to show depth) for hex0
  edge1       array size 6 of edge lines (polygon to show depth) for hex1
  show0       boolean for v-if for hex0 and mask0
  show1       boolean for v-if for hex1 and mask1

  start with small hex and over time 1-5 sec expand to final size
*/
export default {
  name: 'WormHole',

  props: {
    size: {},
    clearColor: 0,
    color: null
  },

  data () {
    return {
      hex0: {
        mask: {
          top: {},
          bot: {}
        },
        node: null
      },
      hex1: {
        mask: {
          top: {},
          bot: {}
        },
        node: null
      },
      red: '#f00',
      green: '#0f0',
      black: '#000',
      hexConst: {
        offset: 0,
        center: {x: 0, y: 0},
        xdm: 0
      },
      edgePts: []
    }
  },

  created () {
    this.hexcolor = '#0f0'
    let asz = {w: 800, h: 800}

    let offset = this.hexConst.offset = (asz.h - (TAU * (asz.h + (asz.h * 1 * 0.1)))) / 2
    let center = this.hexConst.center = {x: asz.w / 2, y: (asz.h / 2) + offset}
    let xdm = this.hexConst.xdm = PHI * center.y

    let e = this.mkHex({x: asz.w * 0.61, y: asz.h * 0.61}, center)

    this.edgePts = [
      {x: 0, y: center.y},
      {x: center.y - xdm, y: 0},
      {x: center.y + xdm, y: 0},
      {x: asz.w, y: center.y},
      {x: center.y + xdm, y: asz.h},
      {x: center.y - xdm, y: asz.h}
    ]
    this.edgePts = e.pts
    console.log(this.edgePts, this.hexConst)

    let hex = this.mkHex({x: (asz.w * 0.55), y: asz.h * 0.55}, center)
    this.hex0.hex = hex
    let mask = this.mkMask(asz, hex)
    this.hex0.mask = mask
    console.log('HEX0', Object.assign({}, this.hex0))
    this.hex0.edges = this.mkEdges(asz, this.hex0.hex.pts)

    hex = this.mkHex({x: (asz.w * 0.5), y: asz.h * 0.5}, center)
    this.hex1.hex = hex
    mask = this.mkMask(asz, this.hex1.hex)
    this.hex1.mask = mask
    console.log('HEX1', Object.assign({}, this.hex0))
    this.hex1.edges = this.mkEdges(asz, this.hex1.hex.pts)
  },

  methods: {
    ...mapActions([
      'animateNow'
    ]),
    mkHex (sz, dif) {
      let pts = []
      let str = []
      for (let i = 0; i < 6; i++) {
        let hb = hexBase[i]
        let pt = {}
        pt.x = hb.x * sz.x + dif.x
        pt.y = hb.y * sz.y + dif.y
        str.push([pt.x, pt.y])
        pts.push(pt)
      }
      return {pts: pts, str: str.join(' ')}
    },

    mkMask (sz, hex) {
      let pts = []
      let str = []
      pts.push({x: 0, y: 0})
      str.push([0, 0])
      for (let i = 0; i < 4; i++) {
        pts.push(hex.pts[i])
        str.push([hex.pts[i].x, hex.pts[i].y])
      }
      pts.push({x: sz.w, y: 0})
      str.push([sz.w, 0])
      let top = {pts: pts, str: str.join(' ')}

      str = []
      pts = []
      pts.push({x: sz.w, y: sz.h})
      str.push([sz.w, sz.h])
      for (let i = 3; i < 7; i++) {
        pts.push(hex.pts[i % 6])
        str.push([hex.pts[i % 6].x, hex.pts[i % 6].y])
      }
      pts.push({x: 0, y: sz.h})
      str.push([0, sz.h])
      let bot = {pts: pts, str: str.join(' ')}
      return {top: top, bot: bot}
    },

    mkEdges (sz, pts) {
      let edgs = []
      for (let i = 0; i < 6; i++) {
        let ept = this.edgePts[i]
        let hpt = pts[i]
        let ply = []
        ply.push([hpt.x, hpt.y])
        if (ept.x <= 0 || ept.x >= sz.w) {
          ply.push([ept.x, ept.y + 4])
          ply.push([ept.x, ept.y - 4])
        }
        if (ept.y <= 0 || ept.y >= sz.w) {
          ply.push([ept.x + 4, ept.y])
          ply.push([ept.x - 4, ept.y])
        }
        edgs.push(ply.join(' '))
      }
      return edgs
    }
  },

  watch: {
    activeNode: function (node) {
    }
  },
  computed: {
    ...mapGetters({
      expandNode1: 'expandNode1',
      expandNode2: 'expandNode2',
      activeNode: 'activeNode'
    }),
    show1: function () {
      if (this.expandNode1 !== null) {
        console.log('show1 Node2')
        this.hex0.node = this.expandNode1
        return true
      } else {
        return false
      }
    },
    show2: function () {
      if (this.expandNode2 !== null) {
        this.hex1.node = this.expandNode2
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.worm-hole {
  width: 100%;
  height: 100%;
  color: #ff0000;
}
</style>
