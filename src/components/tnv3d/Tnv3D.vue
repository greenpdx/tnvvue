<template>
<div class="tnv3d" v-bind:class="sizeClass()">

  <!-- div id="three3d" class="three3d" ref="three3d" -->
    <div id="container">
      <div ref="overlay" id="overlay" @click="clickIt($event)" :size="size">
        <worm-hole></worm-hole>
      </div>
      <v3d-renderer id="renderer" ref="renderer" :size="size" :orbit="controls">
        <v3d-scene ref="scene">
          <v3d-orbit-controls ref="controls">
            <v3d-camera ref="camera0" :position="camPos"></v3d-camera>
          </v3d-orbit-controls>
          <v3d-light color="#ffffff"></v3d-light>
          <v3d-group>
            <v3d-grid :top="active">
            </v3d-grid>
          </v3d-group>
        </v3d-scene>
      </v3d-renderer>
    </div>
  <!-- /div -->

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
      controls: null,
      active: null
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
//    let ele = this.$refs.infopop
//    this.controls = this.$refs.controls
//    ele.style.top = this.mySize.top + 'px'
//    ele.style.left = this.mySize.left + 'px'
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
    activeNode: function () {
      console.log('New active', this.active)
      if (this.activeNode === null) {
        this.active = this.base
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

    zoomIn (node) {

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tnvvote {
  display: inline-block;
}

.three3d {
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

#overlay {
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
