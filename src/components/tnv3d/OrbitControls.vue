<template>
  <div><slot></slot></div>
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
    render: {},
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
      orbit: {}
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
    },

    enabled (val = null) {
      if (val !== null) {
        this.orbit.enabled = val
      }
      return this.orbit.enabled
    },

    animate () {
      this.orbit.update()
    },

    zoomCam (camPath, lookPath) {
      let idx = 0
      let self = this
      let camera = this.camera.curObj
      let timer = setInterval(function () {
        if (idx >= camPath.length) {
          clearInterval(timer)
          self.done = true
          console.log('done')
          return
        }
        let loc = camPath[idx]
        camera.position.set(loc.x, loc.y, loc.z)
        loc = lookPath[idx]
        if (idx >= lookPath.length) {
          loc = lookPath[lookPath.length - 1]
        }
        camera.lookAt(loc.x, loc.y, loc.z)
        idx += 1
        self.render.animate()
      }, 30)
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
  watch: {
    expandNode1: function (node) {
      if (node === null) {

      } else {
        let hex = node.hex
        let loc = hex.loc
        let camera = this.camera.curObj
        let start = camera.position
        let tgt = this.orbit.target
        let c0 = new THREE.Vector3(loc.x, loc.y + 100, loc.z)
        let c1 = new THREE.Vector3(loc.x, loc.y + 10, loc.z)
        let end = new THREE.Vector3(loc.x, loc.y, loc.z)
        let curve = new THREE.CubicBezierCurve3(start, c0, c1, end)
        let pts = curve.getSpacedPoints(66)

        this.orbit.saveState()

        let look = new THREE.LineCurve3(tgt, end)
        let lks = look.getSpacedPoints(33)
//        this.animate()
//        camera.position.set(pts[99].x, pts[99].y, pts[99].z)
//        this.animate()
        this.zoomCam(pts, lks)
        console.log('OC node1', end)
      }
    },
    expandNode2: function (node) {

    }

  }
}
</script>
