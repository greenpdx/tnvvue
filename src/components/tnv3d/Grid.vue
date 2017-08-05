<template>
  <div
    v-on:addChild="addChild"
    v-on:addMaterial="addMat">
    <div>
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
  </div>
</template>
<script>
// import Vue from 'vue'
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
/*  render: function (createElement) {
    return createElement(
      'mesh', [
        createElement('geometry', {
          attrs: {
            type: 'Cylinder',
            args: '20,20,15,6,1,true'
          }
        }),
        createElement('material', {
          attrs: {
            type: 'Normal'
          }
        }),
        this.$slots.default
      ]
    )
  }, */
//   mixins: [Object3D],
  props: {
    obj: {

    },
    position: {
      default: '{"x": 0, "y": 0, "z": 0}'
    },
//    nodes: {
//      type: []
//    },
    top: {}
  },

  data () {
    return {
      nodes: null,
      data: {}
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
    this.mats['selMat'] = new THREE.MeshBasicMaterial({
      map: t0
    })
    let t1 = new THREE.TextureLoader().load(this.heximg)
    t1.flipY = false
    this.mats['selCyl'] = new THREE.MeshBasicMaterial({
      map: t1
    })

    this.curObj = this.obj
    this.curObj = new THREE.Group()
    this.curObj.vue = this
    this.id3d = this.curObj.name || this.curObj.uuid
    this.curObj.name = this.id3d
//    console.log(this.top)
//    this.scale = this.nodes[0].value / 80
    this.curObj.position.y = -40
//    Object.assign(this.curObj.position, this.pos)
    this.$on('rmChild', this.rmChild)
    this.$on('addChild', this.addChild)
//    console.log('NODE', this.nodes)
    this.dbgPrt('createGrd', this.id3d)
  },

  mounted () {
    this.dbgPrt('mountGrd', this.id3d)
//    this.curObj.position.y = 10
    this.$parent.$emit('addChild', this)
  },

  updated () {
    this.dbgPrt('updateGrd', this.id3d)
//    this.$parent.$emit('addGroup', this.curObj)
  },

  computed: {
    heximg () {
      return require('@/assets/cyltop.svg')
    },
    pos: function () {
      let ary = JSON.parse(this.position.replace(/'/g, '"'))
      return ary
    }
  },

  watch: {
    top: function () {
      console.log('grid new top', this.top)
      let itm = this.grps.pop()
      while (itm) {
        this.curObj.remove(itm.curObj)
        itm = null
//        Vue.delete(itm)
        itm = this.grps.pop()
      }
      if (this.top === null) {
        this.top = this.old
      }
      this.old = this.top
      this.scale = this.top.children[0].value / 80
      this.nodes = this.top.children
    }
  },

  methods: {
/*    getData () {
      axios.get('http://10.0.42.81:8181/docs')
        .then(response => {
          console.log('DATA', response)
        })
    },
*/
    rmChild (child) {
      console.log('rmChild Grid')
    },
    addMat (mat) {
      this.dbgPrt('addMat2Grd', mat.uuid, this.id3d)
      this.mats.push(mat)
    },

    addChild (child) {    // also Mesh
      this.dbgPrt('addChild2Grd', child.id3d, this.id3d)
      this.grps.push(child)
      this.curObj.add(child.curObj)
    },

    clickHex (evt) {
      console.log(evt)
    }
  }
}
</script>
