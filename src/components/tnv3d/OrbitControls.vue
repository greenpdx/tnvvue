<template>
  <div id="orbit"><slot></slot></div>
</template>

<script>
import OrbitControls from 'three-orbitcontrols'
// import { Camera } from 'three'
// import { assign } from '@/lib/util'

// import { Object3D } from '@/components/Object3D'
// import { mapGetters } from 'vuex'

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
      orbit: null,
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
      this.curObj.maxPolarAngle = Math.PI / 2

      this.dbgPrt('addCam2Orbt', camera.id3d, this.id3d)
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
    domEle: function () {
      return this.$parent.domElement
    }
  }
}
</script>
