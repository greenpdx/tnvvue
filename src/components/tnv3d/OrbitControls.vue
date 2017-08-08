<template>
  <div id="orbit"><slot></slot></div>
</template>

<script>
import OrbitControls from 'three-orbitcontrols'
import * as THREE from 'three'
// import { Camera } from 'three'
// import { assign } from '@/lib/util'

// import { Object3D } from '@/components/Object3D'
import { mapGetters } from 'vuex'

export default {
  name: 'OrbitControls',
//  mixins: [Object3D],

  props: {
    obj: { type: OrbitControls },
    enable: { default: true },
    minPolarAngle: { default: 0 },
    maxPolarAngle: { default: Math.PI },
    enableDamping: { default: false }
  },

  created () {
    this.id3d = this.name || Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
    this.dbgPrt('createOrbt', this.id3d)
    this.$on('addCamera', this.addCamera)
  },

  data () {
    return {
      curObj: null,
      id3d: '',
      orbit: {},
      grp: null
    }
  },

  mounted () {
    this.dbgPrt('mountOrbt', this.id3d)
    this.$parent.$emit('addCamera', this.camera)
    this.$parent.$emit('addOrbit', this)
  },

  methods: {
    addCamera (camera) {
      this.camera = camera
      if (!(this.curObj instanceof OrbitControls)) {
        this.orbit = new OrbitControls(this.camera.curObj, this.domEle)
      }
      this.orbit.name = this.id3d
      this.curObj = this.orbit
      this.orbit.maxPolarAngle = Math.PI / 2

      this.dbgPrt('addCam2Orbt', camera.id3d, this.id3d)
//      assign(this.curObj.position, this.position)
//      assign(this.curObj.rotation, this.rotation)
      let ptrGeo = new THREE.ConeGeometry(2, -16)
      let ptrMat = new THREE.MeshBasicMaterial({color: '#f00'})
      let ptr = new THREE.Mesh(ptrGeo, ptrMat)
      ptr.visible = false
      this.$parent.$emit('rawChild', ptr)
      this.ptr = ptr
    },

    enabled (val = null) {
      if (val !== null) {
        this.orbit.enabled = val
      }
      return this.orbit.enabled
    },

    animate () {
      this.orbit.update()
    }

  },
  computed: {
    ...mapGetters({
      expandNode1: 'expandNode1',
      expandNode2: 'expandNode2'
    }),
    domEle: function () {
      return this.$parent.domElement
    }
  },
  /* eslint-disable no-unused-vars */
  watch: {
  }
}
</script>
