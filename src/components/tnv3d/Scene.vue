<template>
  <div id="scene">
    <slot></slot>
  </div>
</template>
<script>
import * as THREE from 'three'
// import { mapActions } from 'vuex'
// import Object3D from './Object3D'
// import bus from '@/lib/bus'

export default {
  name: 'Scene',
//   mixins: [Object3D],

  props: {
    obj: { type: THREE.Scene }
//    name: { default: null }
  },

  data () {
    return {
      lights: [],
      childs: [],
      cameras: [],
      orbit: null,
      info: 'test'
    }
  },

  created () {
    this.curObj = this.obj
    if (!(this.curObj instanceof THREE.Scene)) {
      this.curObj = new THREE.Scene()
    }
    this.id3d = this.name || Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)

    this.curObj.name = this.id3d
    this.curObj.vue = this

    let test = true
    if (test) {
      let axis = new THREE.AxisHelper(40)
      this.curObj.add(axis)
      let grid = new THREE.GridHelper(40, 40)
      grid.position.set(0, -40, 0)
      this.curObj.add(grid)
    }
    this.$on('addCamera', this.addCamera)
    this.$on('addLight', this.addLight)
    this.$on('addChild', this.addChild)
    this.$on('rawChild', this.rawChild)
    this.$on('addOrbit', this.addOrbit)
    this.dbgPrt('createScn', this.id3d)
//    this.setScene(this)
  },

  mounted () {
    this.dbgPrt('mountScn', this.curObj.uuid)
    this.$parent.$emit('addScene', this)
//    this.$store.dispatch('sceneReady', this.curObj)
  },

  methods: {
//    ...mapActions('three3d', [
//      'setScene'
//    ]),
    addOrbit (orbit) {
      this.orbit = orbit
    },
    addCamera (camera) {
      this.dbgPrt('addCam2Scn', camera.id3d, this.id3d)
      this.cameras.push(camera)
      this.curObj.add(camera.curObj)
      if (camera.helper !== null) {
        this.curObj.add(camera.helper)
      }
      this.$parent.$emit('addCamera', camera)
    },
    addLight (light) {
      this.dbgPrt('addLight2Scn', light.id3d, this.id3d)
      this.lights.push(light)
      this.curObj.add(light.curObj)
    },
    addChild (child) {
      this.dbgPrt('addChild2Scn', child.id3d, this.id3d)
      this.childs.push(child)
      this.curObj.add(child.curObj)
    },
    rawChild (child) {
      this.curObj.add(child)
    }
  },

  computed: {
    domElement: function () {
      return this.$parent.domElement
    },
    id: function () {
      return this.name || this.curObj.uuid
    }
  }
}
</script>
<style scoped>
#scene {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
