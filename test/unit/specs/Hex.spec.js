/*
  check location
  check height
  check grow
  check hover
  check select
  check wheel
 */

import Vue from 'vue'
import Hex from '@/components/tnv3d/Hex'
import Node from '@/lib/Node'
import * as THREE from 'three'

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

function mkMats () {
  let color = '#f00'
  let mats = {}

  mats['edgeMat'] = new THREE.LineBasicMaterial({color: 0x000000})
  mats['topMat'] = new THREE.MeshNormalMaterial({})
  mats['cylMat'] = new THREE.MeshStandardMaterial({
    color: color,
    side: THREE.DoubleSide
  })
  let t0 = new THREE.TextureLoader().load(heximg)
  t0.needsUpdate = true
  mats['selTop'] = new THREE.MeshBasicMaterial({
    map: t0
  })
  let t1 = new THREE.TextureLoader().load(heximg)
  t1.flipY = false
  mats['selCyl'] = new THREE.MeshBasicMaterial({
    map: t1
  })
  return mats
}

let heximg = ('@/assets/cyltop.svg')

let mats = mkMats()

describe('Hex.vue', () => {
  let tstNode = new Node('hex', 0, null)
  tstNode.sum = 100
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hex)
    const hex = new Constructor({
      propsData: {
        node: tstNode,
        scale: 10,
        index: 10,
        mats: mats,
        size: 5
      }
    }).$mount()
//    console.log(hex.mats, hex._test)
    expect(hex.mats.topMat.id).to.equal(mats.topMat.id)
//    expect(vm.$el.querySelector('.hello h1').textContent)
//      .to.equal('Welcome to Your Vue.js App')
  })
})
