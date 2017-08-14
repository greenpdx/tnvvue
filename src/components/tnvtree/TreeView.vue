<template>
  <div class="tree-view">
    <div v-if="top" class="tv-node">
      <span>Total</span><span> {{ top.showVal() }} </span><br>
      <input
        type="range"
        min="-10000000"
        max="10000000"
        v-bind:value="difVal">
      <span>{{ difVal }}</span>
    </div>
    <div class="tnvtree">
      <div v-for="node in nodes" class="tv-node">
        <tree-view-node
          :node="node"
          v-on:chgParent="top.chgParent">
          <!-- slider-node v-show="selected":node="node"></slider-node -->
        </tree-view-node>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import Node from '@/lib/Node'
import SliderNode from './SliderNode'
import TreeViewNode from './TreeViewNode'

export default {
  name: 'TreeView',
  components: {
    TreeViewNode,
    SliderNode
  },

  props: {
    top: {
//      type: Node
    }
  },

  data () {
    return {
      nodes: [],
      node: null,
      total: 0,
      difVal: 0
    }
  },

  beforeCreate () {
  },

  created () {
    console.log(top)
    this.nodes = this.top.children
    this.total = this.top.total
    this.top.tree = this
    this.top.lockVal = 1
    console.log('tree', this.nodes.length)
  },

  methods: {
  },

  updated () {
    this.nodes = this.top.children
  },

  computed: {
    ...mapGetters({
    })
  }
}
</script>

<style scoped>
.tree-view {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.tv-node {
  display: block;
  float: left;
  width: 45em;
}
.tnvtree {
  display: inline-block;
  height: 100%;
  overflow-y: scroll;
}
.top-slide {
  float: left;
}
</style>
