import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

// import three3d from './modules/three3d'
// import nodes from './modules/nodes'

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  hoverNode: null,
  selectNode: null,
  expandNode: null,
  expanded: false,
  activeNode: null,
  rawData: null,
  rawNodes: {},
  nodes: null,
  display3d: null,
  animateTrig: false,
  webgl: true
}

const getters = {
  hoverNode: state => state.hoverNode,
  selectNode: state => state.selectNode,
  expandNode: state => state.expandNode,
  expanded: state => state.expanded,
  rawData: state => state.rawData,
  activeNode: state => state.activeNode,
  display3d: state => state.display3d,
  getNodeByIdx: state => (idx) => {
    return state.rawData[idx]
  },
  getNodeByKey: state => (key) => {
    return state.rawData[state.rawNodes[key].idx]
  },
  animateDone: state => {
    state.animateTrig = false
  },
  webglEnabled: state => state.webgl
}

const mutations = {
  HOVER (state, self) {
//    console.log('HOVER', self, state.hoverNode)
    if (self === null) {
      if (state.hoverNode !== null) {
        state.hoverNode.hover = false
        state.hoverNode = null
      }
      return
    }
//    console.log(self.hover)
    if (state.hoverNode !== null && state.hoverNode !== self) {
      state.hoverNode.hover = false
    }
    state.hoverNode = self
  },
  SELECT (state, self) {
    if (state.selectNode !== null) {
      state.selectNode.select = false
      if (self.select === false) {
        state.selectNode = null
        return
      }
    }
    state.selectNode = self
  },
  EXPAND (state, self) {
    state.expanded = !state.expanded
    state.expandNode = self
  },
  ACTIVE (state, self) {
    state.activeNode = self
  },
  RAWDATA (state, ary) {
    // do somethings with stored cache for offline
    state.rawData = ary
    ary.forEach((itm, idx) => {
      state.rawNodes[itm._id] = idx
    })
  },
  ANIMATE (state) {
    state.animateTrig = true
  },
  NOWEBGL (state) {
    state.webgl = false
  }

}
const actions = {
  hover ({commit}, obj) {
    commit('HOVER', obj)
  },
  select ({commit}, obj) {
    commit('SELECT', obj)
  },
  setExpand ({commit}, node) {
    commit('EXPAND', node)
  },
  setHover ({commit}, node) {
    commit('HOVER', node)
  },
  setSelect ({commit}, node) {
    commit('SELECT', node)
  },
  setActive ({commit}, node) {
    commit('ACTIVE', node)
  },
  setRawData ({commit}, ary) {
    commit('RAWDATA', ary)
  },
  animateNow ({commit}) {
    commit('ANIMATE')
  },
  noWebgl ({commit}) {
    commit('NOWEBGL')
  }
}

const modules = {
//  three3d: three3d,
//  nodes: nodes
}
// strict = debug
//  plugins: debug ? [createLogger()] : []
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
