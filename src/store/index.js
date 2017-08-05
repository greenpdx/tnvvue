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
  expandNode1: null,
  expandNode2: null,
  activeNode: null,
  rawData: null,
  rawNodes: {},
  nodes: null,
  display3d: null
}

const getters = {
  hoverNode: state => state.hoverNode,
  selectNode: state => state.selectNode,
  expandNode1: state => state.expandNode1,
  expandNode2: state => state.expandNode2,
  rawData: state => state.rawData,
  activeNode: state => state.activeNode,
  display3d: state => state.display3d,
  getNodeByIdx: state => (idx) => {
    return state.rawData[idx]
  },
  getNodeByKey: state => (key) => {
    return state.rawData[state.rawNodes[key].idx]
  }
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
  EXPAND (state, self, lvl) {
//    console.log(self.level, self.expand, self)
    if (self.level === 1) {
      if (state.expandNode1 !== null) {
        state.expandNode1.expand = false
        if (state.expandNode2 !== null) {
          state.expandNode2.expand = false
          state.expandNode2 = null
          state.activeNode = null
        }
      }
      if (self.expand === false) {
        state.expandNode1 = null
        state.activeNode = null
      } else {
        state.expandNode1 = self
        state.activeNode = self
      }
      return
    }
    if (self.level === 2) {
      if (state.expandNode2 !== null) {
        state.expandNode2.expand = false
      }
      if (self.expand === false) {
        state.expandNode2 = null
        state.activeNode = state.expandNode1
      } else {
        state.expandNode2 = self
        state.activeNode = self
      }
    }
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
