<template>
  <div id="renderer">
    <slot></slot>
  </div>
</template>

<script>
// import Vue from 'vue'
/* global requestAnimationFrame */
/* eslint-disable no-duplicate-imports */
import { WebGLRenderer } from 'three'
import * as THREE from 'three'
import { mapGetters, mapActions } from 'vuex'
import WormHole from './WormHole'

export default {
  name: 'Renderer',
  components: {'worm-hole': WormHole},

  props: {
    size: {
      // { w, h }
    },
    obj: { type: WebGLRenderer },
    alpha: {
      type: Boolean,
      default: true
    },
    antialias: {
      type: Boolean,
      default: true
    },
    clearColor: {
      type: String,
      default: '#e0e0e0'
    },
    sortObjects: {
      type: Boolean,
      default: false
    },
    name: {
      default: null
    },
    tnv3d: null
  },

  data () {
    return {
      curObj: null,
      lights: [],
      domEle: null,
      id3d: '',
      sz: {},
      cam: null,
      camPos: {},
      grid: this.tnv3d.grid
    }
  },

  created () {
    this.curObj = this.obj

    if (!(this.curObj instanceof WebGLRenderer)) {
      this.curObj = new WebGLRenderer({ antialias: this.antialias, alpha: this.alpha })
    }
    this.curObj.vue = this
    this.id3d = this.name || Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)

    this.curObj.name = this.id3d
    if (typeof (this.size) === 'string') {
      let str = this.size.replace(/'/gi, '"')
//      console.log(str)
      this.sz = JSON.parse(str)
    } else {
      this.sz = this.size
    }
    console.log(this.sz)
    this.curObj.setSize(this.sz.x, this.sz.y)
//    this.curObj.setSize(800, 800)

    this.domEle = this.curObj.domElement
    this.curObj.setClearColor(this.clearColor)
    this.scene = null
    this.camera = null
//    this.orbit = null
    this.grid0 = this.tnv3d.gridFunc
    this.animate = this.tnv3d.animate
    this.raycast = new THREE.Raycaster()

//    let odom = this.$el.children.overlay
//    this.overlay = odom
    this.domEle.addEventListener('mousemove', this.onMouseMove, true)
    this.domEle.addEventListener('dblclick', this.onClick, false)
    this.domEle.addEventListener('wheel', this.onWheel, false)

    this.$on('addScene', this.addScene)
    this.$on('addCamera', this.addCamera)
    this.dbgPrt('createRen', this.id3d)
//    this.setRenderer(this)
  },

  mounted () {
    this.dbgPrt('mountRen', this.id3d)
//    console.log(this.$refs)
    this.$el.appendChild(this.domEle)
    this.scene = this.tnv3d.grid
    this.animate()
  },

  beforeDestroy () {
//    bus.$off('setScene', this.setScene)
//    bus.$off('setCamera', this.setCamera)
  },

  computed: {
    ...mapGetters({
      selectObj: 'selectObj',
      activeNode: 'activeNode'
    }),
    domElement: function () {
      return this.domEle
    },
    id: function () {
      console.log('id func')
      return this.name || 'renderer'
    },
    scene3D: function () {
      return this.scene.curObj
    },
    grid3D: function () {
      return this.grid0.curObj
    }
  },

  watch: {
    activeNode: function (node) {
/*
      let cam = cams[0].curObj
      cam.position.set(itm.loc.x, itm.loc.y + 50, itm.loc.z)
      console.log('MATCH', itm.hexpos, itm.loc, cam, cam.getWorldDirection())
      cam.lookAt(itm.loc.x, itm.loc.y, itm.loc.z)
      this.renderer.animate()
*/
      if (node === null) {
        this.cam.position.set(this.campos)
//        this.orbit.curObj.reset()
        console.log('renact', this.cam.position)
      } else {
//        let hex = node.hex
//        let loc = hex.loc
//        cam.position.set(loc.x, loc.y + 100, loc.z)
//        cam.lookAt(loc.x, loc.y, loc.z)
      }
//      this.orbit.curObj.reset()
      console.log('renact ani', this.animate)
      this.animate()
    },
    campos: {
      x: function (n, o) {
        console.log('cp.x', n, o)
      },
      y: function (n, o) {
        console.log('cp.y', n, o)
      },
      z: function (n, o) {
        console.log('cp.z', n, o)
      },
      deep: true
    }
  },

  methods: {
    ...mapActions([
      'setHover',
      'setSelect',
      'setExpand'
    ]),
    _getIntersect (evt) {
      let dom = {
        x: this.domEle.offsetLeft,
        y: this.domEle.offsetTop,
        h: this.domEle.offsetHeight,
        w: this.domEle.offsetWidth
      }
      let mouse = {}
      mouse.x = ((evt.layerX - dom.x) / dom.w) * 2 - 1
      // - 40 is grid offest Grid.vue: 82
      mouse.y = -((evt.layerY - dom.y - 40) / dom.h) * 2 + 1
      this.raycast.setFromCamera(mouse, this.camera.curObj)
      // Try using grid as object.
      let obj = this.grid0().curObj
      let rslt = this.raycast.intersectObjects(obj.children, true)
      return rslt
    },
    onMouseMove (evt) {
      evt.preventDefault()
      let intersect = this._getIntersect(evt)
      let obj = null
      if (intersect.length > 0) {  // this app the selection is group
//        obj = intersect[0].object.vue.$parent
        obj = intersect[0].object.parent
        console.log('hover', obj)
        while (obj.vue === null) {
          obj = obj.parent
        }
//        console.log('hover', obj.vue.node.hex)
        obj = obj.vue.node
        obj.hover = true
      }
      this.setHover(obj)
      this.animate()
    },
    onClick (evt) {
      evt.preventDefault()
      let intersect = this._getIntersect(evt)
      let node = null
      if (intersect.length > 0) {
        node = intersect[0].object.parent.vue.node
        node.select = true
        console.log('select', node)
        this.setSelect(node)
      } else {    // change mode
//        console.log('Change Mode', this.orbit.enabled())
      }
      this.animate()
    },
    onWheel (evt) {  // change to wheel selected if mouse over
      let intersect = this._getIntersect(evt)
      if (intersect.length > 0) {
        let obj = intersect[0].object.parent.vue
        console.log('wheel', evt.deltaY, obj, this.selectObj)
        if (obj === this.selectObj) {
          evt.preventDefault()
          evt.stopImmediatePropagation()
          obj.wheelChg(evt.deltaY)
          this.animate()
        }
      }
    },

    addScene (scene) {
      this.scene = this.tnv3d.grid
      this.dbgPrt('addScn2Ren', scene.id3d, this.id3d)
      if (process.env.NODE_ENV === 'development') {
        window.THREE = THREE
        window.scene = scene.curObj
      }
    },

    addCamera (camera) {
      this.dbgPrt('addCam2Ren', camera.id3d, this.id3d)
      this.camera = camera
      this.cam = camera.curObj
      this.campos = this.cam.position
    },

    expand () {

    }
/*    animate () {
      requestAnimationFrame(this.render)
//      this.render()
    },
    render () {
//      this.expand()
      if (this.orbit) {
        this.orbit.animate()
      }
      if (this.wormhole) {
        this.wormhole.update(this.camera)
      }
      console.log('REN', this.cam.position)
      this.curObj.render(this.scene.curObj, this.cam)
    } */
  }
}

</script>
<style scoped>

</style>
