/*
  create node
  add sum
  set to zero
  reset to default
  change value
    change children values
    change parent values
  lock
  unlock

 */

import Vue from 'vue'
import Hex from '@/components/tnv3d/Hex'
import Node from '@/lib/Node'

const debug = false
Vue.mixin({
  methods: {
    dbgPrt () {
      if (debug) {
        console.log(...arguments)
      }
    }
  }
})

describe('Node.js', () => {
  let tstNode = new Node('hex', 0, null)
  tstNode.sum = 100
  it('should render correct contents', () => {
    // statement
    expect(true).to.equal(true)
  })
})
