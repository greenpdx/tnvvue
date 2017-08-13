<template>
  <div id="grid"
    v-on:addChild="addChild"
    v-on:addMaterial="addMat">
      <hex
        v-for="(node, index) in nodes"
        v-bind:node="node"
        v-bind:key="node.value"
        v-bind:index="index"
        v-bind:scale="scale"
        v-bind:mats="mats"
        size="5"
        @click="clickHex">
      </hex>
      <slot></slot>
  </div>
</template>
<script>
// import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as THREE from 'three'
// import axios from 'axios'
// import Object3D from './Object3D'

import Hex from './Hex'
import Group from './Group'
import Mesh from './Mesh'
import Geometry from './Geometry'
import Material from './Material'

export default {
  name: 'Grid',
  components: {
    'mesh': Mesh,
    'geometry': Geometry,
    'material': Material,
    'hex': Hex,
    'v3d-group': Group
  },

//   mixins: [Object3D],
  props: {
    obj: {

    },
    position: {
      default: '{"x": 0, "y": 0, "z": 0}'
    },
    top: {}
  },

  data () {
    return {
      data: {},
      grid: [],
      actGrid: 0
    }
  },

  beforeCreate () {
    this.grps = []
    this.mats = {}
  },

  created () {
    this.color = '#00ff00'
    this.mats['edgeMat'] = new THREE.LineBasicMaterial({color: 0x000000})
    this.mats['topMat'] = new THREE.MeshNormalMaterial({})
    this.mats['cylMat'] = new THREE.MeshStandardMaterial({
      color: this.color,
      side: THREE.DoubleSide
    })
    let t0 = new THREE.TextureLoader().load(this.heximg)
    t0.needsUpdate = true
    this.mats['selTop'] = new THREE.MeshBasicMaterial({
      map: t0
    })
    let t1 = new THREE.TextureLoader().load(this.heximg)
    t1.flipY = false
    this.mats['selCyl'] = new THREE.MeshBasicMaterial({
      map: t1
    })

    for (let i = 0; i < 2; i++) {
      let grid = this.obj
      grid = new THREE.Group()
      grid.vue = this
      grid.id3d = grid.uuid
      grid.position.y = -40
      this.grid[i] = grid
    }
    this.actGrid = 0
    this.curObj = this.grid[0]
    this.id3d = this.curObj.id3d

    this.scale = this.top.children[0].value / 80

    this.$on('rmChild', this.rmChild)
    this.$on('addChild', this.addChild)
    this.dbgPrt('createGrd', this.id3d)
  },

  mounted () {
    this.dbgPrt('mountGrd', this.id3d)
    this.$parent.$emit('addChild', this)
    this.renderer = this.$parent.$parent
  },

  updated () {
    this.dbgPrt('updateGrd', this.id3d)
  },

  computed: {
    ...mapGetters([
    ]),
    heximg () {
      return require('@/assets/cyltop.svg')
    },
    pos: function () {
      let ary = JSON.parse(this.position.replace(/'/g, '"'))
      return ary
    },
    nodes: function () {
      return this.top.children
    }
  },

  watch: {
    top: function (node) {
      console.log('grid new top', this.top)
      // alt between 1 and 0
//      let act = this.actGrid + 1 % 2
      // switch curObj
      let chldn = this.curObj.children
      this.curObj.remove(...chldn)

      this.scale = this.top.children[0].value / 80
    }
  },

  methods: {
    rmChild (child) {
      this.dbgPrt('rmChild Grid', child.id3d)
    },
    addMat (mat) {
      this.dbgPrt('addMat2Grd', mat.uuid, this.id3d)
      this.mats.push(mat)
    },

    addChild (child) {    // also Mesh
      this.dbgPrt('addChild2Grd', child.id3d, this.id3d)
      this.curObj.add(child.curObj)
    },

    clickHex (evt) {
      console.log(evt)
    }
  }
}
</script>
