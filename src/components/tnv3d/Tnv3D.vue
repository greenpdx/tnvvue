<template>
  <div id="tnv3d" v-bind:class="sizeClass()">
    <v3d-renderer id="renderer" ref="renderer" :size="size" :tnv3d="this">
      <worm-hole id="wormhole" ref="wormhole" :tnv3d="this"></worm-hole>
      <v3d-scene ref="scene">
        <v3d-orbit-controls ref="orbit">
          <v3d-camera ref="camera0" :position="camPos"></v3d-camera>
        </v3d-orbit-controls>
        <v3d-light color="#ffffff" id="light"></v3d-light>
        <v3d-grid :top="active" ref="grid" id="grid"></v3d-grid>
      </v3d-scene>
    </v3d-renderer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import * as THREE from 'three'
// import axios from 'axios'

import Renderer from './Renderer'
import Scene from './Scene'
import Camera from './Camera'
import Light from './Light'
import Mesh from './Mesh'
import Geometry from './Geometry'
import Material from './Material'
import OrbitControls from './OrbitControls'
import Group from './Group'
import Grid from './Grid'
import WormHole from './WormHole'

export default {
  name: 'Tnv3D',

  components: {
    'v3d-renderer': Renderer,
    'v3d-scene': Scene,
    'v3d-camera': Camera,
    'v3d-light': Light,
    'v3d-mesh': Mesh,
    'v3d-geometry': Geometry,
    'v3d-material': Material,
    'v3d-orbit-controls': OrbitControls,
    'v3d-group': Group,
    'v3d-grid': Grid,
    'worm-hole': WormHole
  },

  props: {
    top: {
      type: Object
    },
    size: {},
    camPos: {},
    freeze: {}
  },

  data () {
    return {
      grppos: {
        'x': 0,
        'y': 10,
        'z': 0
      },
      orbit: null,
      active: null,
      renderer: null,
      camera: null,
      wormhole: null,
      grid: null
    }
  },

  beforeCreate () {
  },

  created () {
    console.log('TNV3D', this.size, this.top)
    this.base = this.top
    this.setActive(this.top)
  },

  mounted () {
    this.orbit = this.$refs.orbit
    this.scene = this.$refs.scene
    this.renderer = this.$refs.renderer
    this.camera = this.$refs.camera0
    this.wormhole = this.$refs.wormhole
    this.grid = this.$refs.grid
  },

  computed: {
    ...mapGetters({
      hoverNode: 'hoverNode',
      selectNode: 'selectNode',
      activeNode: 'activeNode',
      expandNode1: 'expandNode1',
      expandNode2: 'expandNode2'
    })
  },

  watch: {
    activeNode: function (node) {
      console.log('tnv3d active', node, this.camera.curObj.position)
      if (this.activeNode === null) {
        this.active = this.base
//        let pos = this.camPos
//        let cam = this.camera.curObj
  //      cam.lookAt(new THREE.Vector3())
//        cam.position.set(pos.x, pos.y, pos.z)
      } else {
        this.active = this.activeNode
      }
    }
  },

  methods: {
    ...mapActions([
      'setActive'
    ]),
    sizeClass () {
      return {
        'width': this.size.x + 'px',
        'height': this.size.y + 'px'
      }
    },
    gridFunc () {
      return this.grid
    },
    animate () {
//      requestAnimationFrame(this.animate)
      requestAnimationFrame(this.render)
//    this.render()
    },
    render () {
      if (this.orbit) {
        this.orbit.animate()
      }
      if (this.wormhole) {
//        this.wormhole(this.camera.curObj)
      }
      this.renderer.curObj.render(this.scene.curObj, this.camera.curObj)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tnvvote {
  display: inline-block;
}

#tnv3d {
  float: left;
  width: 48%;
  height: 800px;
}

.infopop {
  border: 2 solid black;
  width: 30em;
  height: 100px;
  position: absolute;
  display: inline-block;
  top: 0px;
  left: 0px;
  background-color: yellow;
  z-index: 10;
}

.right {
  float: right;
  width: 45%;
  text-align: left;
  font-size: 1.2em;
}

#container {
  position: relative;
}

#renderer {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 40;
}

#wormhole {
  position: absolute;
  z-index: 10;
  top: -20;
  left: 0;
  width: 800px;
  height: 800px;
  pointer-events: none;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
