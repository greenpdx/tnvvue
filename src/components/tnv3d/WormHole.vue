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
      <g v-if="hex0.show" @click="click0">
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
import * as THREE from 'three'

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
  expand:
    start cam zoom in, start create new grid
    finish can zoom, start svg grow, blank 3d, change cam infinity
    finish svg, turn on 3d and zoom to position
  colapse:
    cam zoom infinity, start creat new grid
    svg start, blank 3d,
    enable 3d, zoom cam from hex out to pos

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
    color: null,
    tnv3d: null
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
      edgePts: [],
      zoom1: null,
      zoom2: null
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
    this.animate = this.tnv3d.animate()
  },
  mounted () {
  },

  methods: {
    ...mapActions([
      'setActive'
    ]),
    onClick (evt) {
      console.log('svg click', evt)
    },
    click0 (evt) {
//      zoomOut()
      console.log('click0')
    },
    zoomIn (hex) {
      let cnt = 0.05
      let self = this
      let timer = setInterval(function () {
        if (cnt >= hex.size) {
          clearInterval(timer)
          return
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
          return
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
    },

    zoomStep (cnt, camPath, lookPath, camera) {
      let loc = lookPath
      let whr = camPath[cnt]
      camera.up = new THREE.Vector3(0, 1, 0)
      camera.lookAt(new THREE.Vector3(loc.x, loc.y, loc.z))
      camera.position.set(whr.x, whr.y, whr.z)
//    self.update
    },
    camZoom (node) {
      let camera = this.tnv3d.camera.curObj
      let start = camera.position
      if (node === null) {
        console.log('CZ', start)
      } else {
        let hex = node.hex
        let loc = hex.loc
        loc.y = hex.height - 40
        let c0 = new THREE.Vector3(loc.x, loc.y + 50, loc.z)
        let c1 = new THREE.Vector3(loc.x, loc.y + 10, loc.z)
        let end = new THREE.Vector3(loc.x, loc.y + 10, loc.z)
        let curve = new THREE.CubicBezierCurve3(end, c1, c0, start)
        let pts = curve.getSpacedPoints(6)

        let look = new THREE.LineCurve3(end, start)
        let lks = look.getSpacedPoints(6)
        lks = end
        console.log('camZoom', end, pts, lks, start)
        // visual cone to hex
//        let ptrGeo = new THREE.ConeGeometry(2, -16)
//        let ptrMat = new THREE.MeshBasicMaterial({color: '#f00'})
//        let ptr = new THREE.Mesh(ptrGeo, ptrMat)
//        this.$parent.$emit('rawChild', ptr)
//        let ptr = this.ptr
//        ptr.visible = true
//        ptr.position.set(start.x, start.y, start.z)

        this.pts = pts
        this.lks = lks
        this.cnt = 5
//        this.zoomLoop(pts, lks, camera)
//        let self = this
/*        let timer = setInterval(function () {
          if (self.cnt < 0) {
            clearInterval(timer)
            self.done = true
            return
          }
          self.animate()
        }, 3000) */
//        console.log('OC node1', end, pts.length)
      }
    },
    update (camera) {
      if (this.cnt >= 0) {
//        this.zoomStep(this.cnt, this.pts, this.lks, camera)
        this.cnt -= 1
      }
    }
  },

  watch: {
    // this needs to made better
    expanded: function () {
      let node = this.expandNode
      let lvl1 = this.tnv3d.lvl1
      let lvl2 = this.tnv3d.lvl2
      if (lvl1 && !this.hex0.show) {
        this.hex0.name = this.expandNode.name
        this.hex0.show = true
        this.zoomIn(this.hex0)
      }
      if (!lvl1 && this.hex0.show) {
        this.zoomOut(this.hex0)
      }
      if (lvl2 && !this.hex1.show) {
        this.hex1.name = this.expandNode.name
        this.hex1.show = true
        this.zoomIn(this.hex1)
      }
      if (!lvl2 && this.hex1.show) {
        this.zoomOut(this.hex1)
      }
      console.log('WH exp', lvl1, lvl2, node)
    },
    zoom1: function (node) {
      console.log('hex0', node, this.hex0)
      this.setActive(node)
      if (node === null) {
        this.zoomOut(this.hex0)
      } else {
        this.hex0.show = true
        this.hex0.name = node.name
        this.zoomIn(this.hex0)
      }
    },
    zoom2: function (node) {
      this.setActive(node)
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
      expandNode: 'expandNode',
      expanded: 'expanded',
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
