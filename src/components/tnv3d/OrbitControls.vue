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
    },

    zoomCam (camPath, lookPath, ptr) {
      let idx = 0
      let self = this
      let loc = lookPath[lookPath.length - 1]
      let timer = setInterval(function () {
        if (idx > camPath.length - 1) {
          clearInterval(timer)
          console.log('done', self.camera.curObj.position)
          self.done = true
//          self.ptr.visible = false
          return
        }
//        let loc = lookPath[idx]
        if (idx > camPath.length - 1) {
          idx = camPath.length - 1
        }
        let whr = camPath[idx]
        ptr.lookAt(loc.x, loc.y, loc.z)
        console.log(idx, loc, whr, 'cam', self.camera.curObj.position)
        ptr.position.set(whr.x, whr.y, whr.z)
        self.render.animate()
        idx += 1
      }, 300)
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
    expandNode1: function (node) {
//      this.camera = this.renderer
      this.enabled(false)
      if (node === null) {

      } else {
        let hex = node.hex
        let loc = hex.loc
        loc.y = hex.height - 40
        let camera = this.camera.curObj
        let start = camera.position
        let c0 = new THREE.Vector3(loc.x, loc.y + 50, loc.z)
        let c1 = new THREE.Vector3(loc.x, loc.y + 10, loc.z)
        let end = new THREE.Vector3(loc.x, loc.y, loc.z)
        let curve = new THREE.CubicBezierCurve3(start, c0, c1, end)
        let pts = curve.getSpacedPoints(6)

        let look = new THREE.LineCurve3(start, end)
        let lks = look.getSpacedPoints(6)

        //        console.log('CURVE', start, c0, c1, end)
      // visual cone to hex
//        let ptrGeo = new THREE.ConeGeometry(2, -16)
//        let ptrMat = new THREE.MeshBasicMaterial({color: '#f00'})
//        let ptr = new THREE.Mesh(ptrGeo, ptrMat)
//        this.$parent.$emit('rawChild', ptr)
//        let ptr = this.ptr
//        ptr.visible = true
//        ptr.position.set(start.x, start.y, start.z)

//        console.log('cam', camera.getWorldDirection(), camera.getWorldPosition())

        this.zoomCam(pts, lks, camera)
        console.log('OC node1', end, pts.length)
      }
    },
    expandNode2: function (node) {

    }

  }
}
</script>
