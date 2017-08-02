<template>
</template>

<script>
import Node from '@/api/Node'

var _active = []
export const ONE_VAL = (2 ** 30)

export default {
  name: 'NodeVue',

  props: {
  },

  data () {
    return {
      name: '',
      def: 0,
      value: 0,
      parent: null,
      children: [],
      index: -1,
      selected: false,
      hover: false,
      ONE_VAL: ONE_VAL
    }
  },

  beforeCreate () {
  },

  created () {
    this.nodeObj = new Node(this.name, 0, -1)
  },

  constructor (name, idx, parent) {
    this.name = name
    this.idx = idx
    this.parent = parent
//    this.$on('chgParent', this.chgParent)
//    this.$on('chgChild', this.chgChild)
    this.lidx = _active.push(this) - 1
    this.children = []
    this.test = _active
  }
}
</script>
