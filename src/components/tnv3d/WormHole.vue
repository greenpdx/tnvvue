<template>
  <div class="worm-hole">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <g v-if="hex1.show">
        <polygon :points="hex1.hex" fill-opacity="0" stroke="black"/>
        <polygon :points="hex1.top" :fill="green" />
        <polygon :points="hex1.bot" :fill="green" />
        <text x="300" y="60" >{{ hex1.name }}</text>
        <polygon v-for="edge in hex1.edges" :points="edge" fill="black" stroke="black"/>
      </g>
      <g v-if="hex0.show">
        <polygon :points="hex0.hex" fill-opacity="0" stroke="black"/>
        <polygon :points="hex0.top" :fill="red" />
        <polygon :points="hex0.bot" :fill="red" />
        <text x="300" y="20" >{{ hex0.name }}</text>
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
    size: {
      type: Object,
      default () {
        return {x: 800, y: 800}
      }
    },
    clearColor: 0,
    color: null
  },

  data () {
    return {
      hex0: {
        top: '',
        bot: '',
        hex: '',
        edges: [],
        size: 0.55,
        show: false,
        name: ''
      },
      hex1: {
        top: '',
        bot: '',
        hex: '',
        edges: [],
        size: 0.5,
        show: false,
        name: ''
      },
      red: '#f00',
      green: '#0f0',
      black: '#000',
      center: {x: 0, y: 0},
      edgePts: []
    }
  },

  created () {
    this.hexcolor = '#0f0'
    let asz = this.size
    console.log(asz)
    let offset = (asz.y - (TAU * (asz.y + (asz.y * 1 * 0.1)))) / 2
    let center = this.center = {x: asz.x / 2, y: (asz.y / 2) + offset}
    let xdm = PHI * center.y

    let e = this.mkHex({x: asz.x * 0.61, y: asz.y * 0.61}, center)

    this.edgePts = [
      {x: 0, y: center.y},
      {x: center.y - xdm, y: 0},
      {x: center.y + xdm, y: 0},
      {x: asz.w, y: center.y},
      {x: center.y + xdm, y: asz.y},
      {x: center.y - xdm, y: asz.y}
    ]
    this.edgePts = e.pts

//    this.mksvg(start)
  },

  methods: {
    ...mapActions([
    ]),
    zoomIn (hex) {
      let cnt = 0.05
      let self = this
      let timer = setInterval(function () {
        if (cnt >= hex.size) {
          clearInterval(timer)
        }
        let dom = self.mksvg({x: self.size.x * cnt, y: self.size.y * cnt})
        hex.hex = dom.hex
        hex.top = dom.top
        hex.bot = dom.bot
        hex.edges = dom.edges
        cnt += 0.01
      })
    },
    zoomOut (hex) {
      let cnt = hex.size
      let self = this
      let timer = setInterval(function () {
        if (cnt <= 0.05) {
          clearInterval(timer)
          hex.show = false
        }
        let dom = self.mksvg({x: self.size.x * cnt, y: self.size.y * cnt})
        hex.hex = dom.hex
        hex.top = dom.top
        hex.bot = dom.bot
        hex.edges = dom.edges
        cnt -= 0.01
      })
    },
    mksvg (size) {
      let dom = {}
      let hex = this.mkHex(size, this.center)
      dom.hex = hex.str
      let mask = this.mkMask(this.size, hex)
      dom.top = mask.top
      dom.bot = mask.bot
      dom.edges = this.mkEdges(this.size, hex.pts)
      return dom
    },
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
      let str = []
      str.push([0, 0])
      str.push([0, hex.pts[0].y])
      for (let i = 0; i < 4; i++) {
        str.push([hex.pts[i].x, hex.pts[i].y])
      }
      str.push([sz.x, hex.pts[3].y])
      str.push([sz.x, 0])
      let top = str.join(' ')

      str = []
      str.push([sz.x, sz.y])
      str.push([sz.x, hex.pts[3].y])
      for (let i = 3; i < 7; i++) {
        str.push([hex.pts[i % 6].x, hex.pts[i % 6].y])
      }
      str.push([0, hex.pts[0].y])
      str.push([0, sz.y])
      let bot = str.join(' ')
      return {top: top, bot: bot}
    },

    mkEdges (sz, pts) {
      let edgs = []
      for (let i = 0; i < 6; i++) {
        let ept = this.edgePts[i]
        let hpt = pts[i]
        let ply = []
        ply.push([hpt.x, hpt.y])
        if (ept.x <= 0 || ept.x >= sz.x) {
          ply.push([ept.x, ept.y + 4])
          ply.push([ept.x, ept.y - 4])
        }
        if (ept.y <= 0 || ept.y >= sz.x) {
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
    },
    expandNode1: function (node) {
      console.log('hex0', node, this.hex0)
      if (node === null) {
        this.zoomOut(this.hex0)
      } else {
        this.hex0.show = true
        this.hex0.name = node.name
        this.zoomIn(this.hex0)
      }
    },
    expandNode2: function (node) {
      if (node === null) {
        this.zoomOut(this.hex1)
      } else {
        this.hex1.show = true
        this.hex1.name = node.name
        this.zoomIn(this.hex1)
      }
    }
  },
  computed: {
    ...mapGetters({
      expandNode1: 'expandNode1',
      expandNode2: 'expandNode2',
      activeNode: 'activeNode'
    })
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
