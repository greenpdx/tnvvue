<template>
  <div class="tree-view-node">
    <div class="tvn-node">
      <div v-if="node.hasChildren" class="tvn-expand">
        <div v-bind:class="indent" @click="onExpand">
          <span v-show="expanded">&#9660;</span>
          <span v-show="!expanded">&#9658;</span>
        </div>
        <div class="tvn-line" @click="selClick">
          <span class="tvn-amount"> {{ node.showVal() }}</span>
          <span class="tvn-name"> {{ name }} </span>
        </div>
        <slider-node
          v-if="selected"
          :node="node"></slider-node>
        <div v-show="expanded">
          <div v-for="node in nodes">
            <tree-view-node
              :node="node"
              :level="level + 1"></tree-view-node>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="tvn-line" @click="selClick">
          <span class="noexpand">&#9866;</span>
          <span class="tvn-amount"> {{ node.showVal() }}</span>
          <span class="tvn-name"> {{ name }} </span>
        </div>
        <slider-node
          v-if="selected"
          :node="node"></slider-node>
      </div>
    </div>
    <br/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Node from '@/lib/Node'

import SliderNode from './SliderNode'

export default {
  name: 'TreeViewNode',

  components: {
    SliderNode
  },

  props: {
    node: {
      type: Node
    },
    level: {
      default: 0
    }
  },

  data () {
    return {
      total: 0,
      locked: false,
      change: false
    }
  },

  created () {
    this.node.vue.push(this)
    this.total = this.node.total
    this.children = this.node.children
  },

  mounted () {
    this.change = true
  },
  updated () {
    this.dbgPrt('tnodeUpdate')
  },

  methods: {
    ...mapActions([
      'setSelect',
      'setHover',
      'setExpand'
    ]),
    selClick () {
      if (this.selected) {
        this.node.select = false
        this.setSelect(this.node)
      } else {
        this.node.select = true
        this.setSelect(this.node)
      }
    },
    onExpand (val = null) {
      if (this.expanded) {
        this.node.expand = false
        this.setExpand(this.node)
      } else {
        this.node.expand = true
        this.setExpand(this.node)
      }
    }
  },

  computed: {
    ...mapGetters([
      'rawData',
      'getNodeByIdx'
    ]),
    expanded: function () {
      return this.node.expand
    },
    selected: function () {
      return this.node.select
    },
    name: function () {
      return this.node.name
    },
    hovered: function () {
      return this.node.hover
    },
    nodes: function () {
      return this.children
    },
    indent: function () {
      let lvl = 'level0'
      switch (this.level) {
        case 2:
          lvl = 'level2'
          break
        case 1:
          lvl = 'level1'
          break
        default:
      }
      return lvl
    }
  }
}
</script>

<style scoped>
.tree-view-node {
  display: block;
  float: left;
  width: 45em;
}
.tvn-expand {
  display: inline;
}
.noexpand {
  float: left;
  text-align: right;
  width: 3em;
  cursor: cell;
}
.tvn-expander {
  float: left;
  text-align: left;
  cursor: pointer;
}
.level0 {
  float: left;
  text-align: left;
  cursor: pointer;
  width: 3em;
}
.level1 {
  float: left;
  text-align: left;
  cursor: pointer;
  width: 2em;
  padding-left: 1em;
}
.level2 {
  float: left;
  text-align: left;
  cursor: pointer;
  width: 1em;
  padding-left: 2em;
}
.tvn-node {
  display: inline-block;
  float: left;
  width: 100%
}
.tvn-line {
  text-align: left;
  cursor: cell;
}
.tvn-amount {
  display: inline-block;
  width: 4em;
  text-align: right;
  margin-right: 1em;
}
.tvn-name {
}
</style>
