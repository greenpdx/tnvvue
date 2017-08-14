<template>
  <div id="hex">
    <!-- img class="heximg" ref="heximg" src="../../assets/hextop.svg" / -->
  </div>
</template>
<script>
import * as THREE from 'three'
import { mapGetters } from 'vuex'
// import Object3D from './Object3D'
import Node from '@/lib/Node'

import Mesh from './Mesh'
import Group from './Group'
import Geometry from './Geometry'
import Material from './Material'

/* good reference
http://www.redblobgames.com/grids/hexagons/
  */

const SQRT3 = Math.sqrt(3)
// const HEXLAYER = [0, 6, 18, 36, 60, 90, 126]
/* const cubeCoord = [
  {x: 0, y: -1, z: 1},
  {x: 1, y: -1, z: 0},
  {x: 1, y: 0, z: -1},
  {x: 0, y: 1, z: -1},
  {x: -1, y: 1, z: 0},
  {x: -1, y: 0, z: 1}
] */

export default {
  name: 'Hex',
//   mixins: [Object3D],
  components: {
    'v3d-mesh': Mesh,
    'v3d-geometry': Geometry,
    'v3d-material': Material,
    'v3d-group': Group
  },

  props: {
    position: {
      default: '{"z":0,"y":0."y":0}'
    },
    node: {
      type: Node,
      required: true
    },
    index: 0,
    size: {
      default: 10
    },
    scale: {
      default: 1000
    },
    mats: {
      edgeMat: null,
      topMat: null,
      cylMat: null,
      selMat: null,
      selCyl: null
    }
  },

  data () {
    return {
      id: '',
      height: 0,
      argCyl: '10,10,15,6,1,true',
      argTop: '10,0.1,10,6,1,true',
      id3d: ''
    }
  },

  beforeCreate () {
  },
  created () {
    this.curObj = {}
    this.node.index = this.index
    // create new hex Object
    let group = new THREE.Group()
    group.vue = this
    this.id3d = this.name || group.uuid
    group.name = this.id3d

    this.height = this.node.value / this.scale

    let cylGeo = new THREE.CylinderGeometry(this.size, this.size, this.height, 6, 1, true)
    let cyl = new THREE.Mesh(cylGeo, this.mats.cylMat)
    cyl.vue = this
    let edg = this.drawEdges(cylGeo, this.mats.edgeMat)
    edg.vue = this
    cyl.add(edg)
    cyl.position.y = 0

    let topGeo = new THREE.CylinderGeometry(0.1, this.size, -5, 6, 1, true)
    let top = new THREE.Mesh(topGeo, this.mats.topMat)
    top.position.y = this.height / 2 - 2.5
    top.vue = this

    group.add(cyl)
    this.cyl = cyl
    group.add(top)
    this.top = top

    this.curObj = group

    let pos = this.idx2pos(this.index)
    this.hexpos = pos
    this.loc = this.positionHex(pos.x, pos.y, pos.z)
    this.node.hex = this

    this.dbgPrt('createHex', this.id3d, this.node.value, this.height, this.scale)
  },

  mounted () {
    this.dbgPrt('mountHex', this.id3d)
    this.$parent.$emit('addChild', this)
  },

  updated () {
    this.dbgPrt('updateHex', this.id3d)
  },

  beforeDestroy () {
    this.$parent.$emit('rmChild', this)
  },

  destroyed () {

  },

  computed: {
    ...mapGetters({
    }),
    heximg () {
      return require('@/assets/cyltop.svg')
    },
    pos: function () {
      let ary = JSON.parse(this.position.replace(/'/g, '"'))
      return ary
    },
    hovered: function () {
      return this.node.hover
    },
    selected: function () {
      let select = this.node.select
//      console.log(select, this)
      return select
    },
    expanded: function () {
      return this.node.expand
    },
    _test: function () {
      return this.curObj
    }
  },

  methods: {
    wheelChg (delta) {
//      let node = this.node
//      console.log(node.value, this.height, this.scale)
    },

    grow (h) {
      if (this.height + h < 1) {
        return this.height
      }
      let geo = this.top
      geo.position.y = h - 5

      let mesh = this.cyl
      geo = mesh.geometry
      geo.verticesNeedUpdate = true
      let cverts = geo.vertices.slice(6, 12)

      this.height = h + this.height
      for (let i = 0; i < 6; i++) {
        cverts[i].y = h + cverts[i].y
      }
         // update edges
      mesh.remove(mesh.children[0])
      mesh.add(this.drawEdges(mesh.geometry))

      return this.height
    },

    drawEdges (obj, mat) {
      let edges = new THREE.EdgesGeometry(obj, 1)
      let line = new THREE.LineSegments(edges, mat)
      return line
    },

    /*
    side 0, 3   y = level, x = offset
    side 1, 4   x = level, z = offset
    side 2, 5   z = level, y = offset
    */
    /* eslint no-fallthrough: ["warn"] */
    idx2pos (idx) {
      let lvl = 0
      let chg = 0
      let sub = 0
      for (lvl = 0; chg <= idx; lvl++) {
        sub = chg
        chg = (lvl * 6) + chg
      }
      lvl = lvl - 1
      let dif = idx - sub
      let side = Math.floor(dif / lvl)
      let off = dif % lvl
      let sign = 1
      let y
      let x
      let z
      switch (side) {
        case 0:
          sign = -1
// eslint-disable-next-line
        case 3:
          y = lvl * sign
          x = -off * sign
          z = -x - y
          break
        case 4:
          sign = -1
// eslint-disable-next-line
        case 1:
          x = lvl * sign
          z = -off * sign
          y = -z - x
          break
        case 2:
          sign = -1
// eslint-disable-next-line
        case 5:
          z = lvl * sign
          y = -off * sign
          x = -y - z
          break
        default:
      }
      return ({x: x, y: y, z: z})
    },
    positionHex (q = 0, r = 0, s = 0) {
      let loc = {}
      loc.x = (r - s) * this.size * (SQRT3 / 2)
      loc.y = this.height / 2
      loc.z = (q) * this.size * SQRT3 * (SQRT3 / 2)
      this.curObj.position.set(loc.x, loc.y, loc.z)
      return loc
    },
    onHover () {
      let self = this
      this.$store.dispatch('hover', { self })
    },
    onSelect () {
      let self = this
      this.$store.dispatch('select', { self })
    }
  },
  watch: {
    hovered () {
      let val = this.node.hover
      if (val) {
//        console.log('hovered', val, this)
        this.cyl.material = this.mats.selCyl
        this.top.material = this.mats.selTop
      } else {
        this.cyl.material = this.mats.cylMat
        this.top.material = this.mats.topMat
      }
    },
    selected () {
//      let val = this.selected
//      console.log(val, this)
    }
  }
}
</script>
<style scoped>
.heximg {
  visibility: hidden;
}
</style>
