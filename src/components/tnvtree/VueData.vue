<template>
<div class="vue-data">
  <h1>{{ msg }}</h1>
  <div class="hrow">
    <div>
      <input type="radio" id="real" name="testData" value="false" v-model="testData" checked="true">
      <label for="real">Real data</label>
      <input type="radio" id="test" name="testData" value="true" v-model="testData">
      <label for="test">Test data</label>
    </div>
    <div>
      <select v-model="index">
          <option v-for="n in range(0,9)">{{ n }}</option>
        </select>
    </div>
    <div>
      <select v-model="selectedKey">
          <option v-for="k in keys">{{ k }}</option>
        </select>
    </div>
    <div>
      <button v-on:click="chkClick($event)">Check</button>
    </div>
    <div class="controls">
      <fieldset class="chkgroup">
        <legend>Select display category</legend>
        <div class="chklist">
          <label class="chkinput"><input v-model="beacat" type="checkbox" value="discretionary"/>
              <span class="chkbox">Discretionary</span></label>
          <label class="chkinput"><input v-model="beacat" type="checkbox" value="mandatory"/>
              <span class="chkbox">Mandatory</span></label>
          <label class="chkinput"><input v-model="beacat" type="checkbox" value="interest">
              <span class="chkbox">Interest</span></label>
        </div>
      </fieldset>
      <div class="chklist">
        <select @change="onSelect($event)" class="chkinput" v-model="year">
          <option class="chkinput" v-for="n in range(1976,2017)">{{ n }}</option>
        </select>
      </div>
      <button @click="onClick">Test</button>
    </div>
  </div>
  <div class='tree-view'>
    <tree-view v-if="top" :top="top">
    </tree-view>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import axios from 'axios'

import Node from '@/lib/Node'
import TreeView from './TreeView'

export default {
  name: 'VueData',
  components: {
    TreeView
  },

  props: {

  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      index: 5,
      key: '',
      selectedKey: null,
      dataLoaded: [],
      year: 2016,
      selectedYear: 2016,
      beacat: ['discretionary'],
      rawTree: {
        total: 0,
        tree: []
      },
      total: 0,
      top: null,
      tree: [],
      testData: false
    }
  },

  beforeCreate () {},

  created () {
    this.testData = false
  },

  beforeMount () {

  },

  mounted () {},

  beforeUpdate () {

  },

  updated () {

  },

  methods: {
    ...mapActions({
      setNodes: 'setNodes',
      setActive: 'setActive',
      setTotal: 'setTotal',
      setTree: 'setTree',
      addActiveNode: 'addActiveNode'
    }),

    onSelect (evt) {
      console.log('CHG', evt.target.value)
      this.selectedYear = evt.target.value
    },

    sortSum (a, b) {
      if (a.sum > b.sum) { return -1 }
      if (a.sum < b.sum) { return 1 }
      return 0
    },

    onClick (evt) {
      if (this.testData) {
        this.top = this.rawTree.top
        this.tree = this.top.children
        this.setTree(this.tree)
        return
      }
      let ary = this.rawData
      this.total = 0
      this.top = null
      this.tree = null
      let rslt = this.groupData(ary, this.filterData)
      console.log(rslt.total)
      this.top = rslt.tree
      this.tree = rslt.tree.children
      this.setTree(this.tree)
    },

    groupData (nodes, filterCB) {
      let map = {}
      let total = 0
      let top = new Node('Total', 0, -1)
      let tree = top.children
      nodes.forEach((itm, idx) => {
        if (!filterCB(itm)) {
          return
        }
        let val = itm[this.selectedYear.toString()]
        total += val
        let parent = top
        if (!map[itm.agencycode]) {
          let tmp = map[itm.agencycode] =
            new Node(itm.agencyname, idx, parent)
          tree.push(tmp)
        }
        parent = map[itm.agencycode]
        map[itm.agencycode].sum += val
        if (!map[itm.agencycode].children[itm.bureaucode]) {
          map[itm.agencycode].children[itm.bureaucode] =
            new Node(itm.bureauname, idx, parent)
        }
        parent = map[itm.agencycode].children[itm.bureaucode]
        map[itm.agencycode].children[itm.bureaucode].sum += val
        let tmp = new Node(itm.acctname, idx, parent)
        tmp.sum = val
        map[itm.agencycode].children[itm.bureaucode].children.push(tmp)
      })

      top.total = total
      top.value = total / 2
      top.default = total

      tree.sort((a, b) => this.sortSum(a, b))
      for (let a of tree) {
        let achld = Object.values(a.children)
        achld.sort((a, b) => this.sortSum(a, b))
        a.children = achld
        for (let b of achld) {
          let bchld = b.children
          bchld.sort((a, b) => this.sortSum(a, b))
          b.children = bchld
        }
      }

      this.rawTree.total = total
      this.rawTree.tree = tree
      this.rawTree.top = top
      return {total: total, tree: top}
    },

    filterData (itm, idx) {
      let set = new Set(this.beacat)
      if (!set.has(itm.beacat.toLowerCase())) {
        return false
      }
      if (itm.onoffbudget !== 'On-budget') {
        return false
      }
      if (itm[this.selectedYear.toString()] === 0) {
        return false
      }
      if (itm[this.selectedYear.toString()] < 0) {
        return false
      }
      this.total += itm[this.selectedYear.toString()]
      return true
    },

    chkClick (evt) {
      let itm = this.getNodeByKey(this.selectedKey)
      console.log(Object.assign({}, itm))
    },

    loadData () {
      let self = this
      axios.get('http://10.0.42.81:8181/docs/local/budget/full?limit=0')
        .then(response => {
          let rslt = response.data
          let data = rslt.data.sort((a, b) => {
            if (a.agencycode > b.agencycode) {
              return 1
            }
            if (a.agencycode < b.agencycode) {
              return -1
            }
            if (a.bureaucode > b.bureaucode) {
              return 1
            }
            if (a.bureaucode < b.bureaucode) {
              return -1
            }
            return 0
          })
          self.setNodes(data)
          self.dataLoaded = []
        })
    },

    range (min, max) {
      let ary = []
      for (let i = max; i >= min; i--) {
        ary.push(i)
      }
      return ary
    },

    genData () {
      let data = []
      let idx = 0
      let top = new Node('Total', -1, null)
      top.sum = 10000000
      let tree = top.children
      let total = 0//  = 1000000
      for (let a = 4; a > 0; a--) {
        let anam = 'A' + a.toString()
        let anode = new Node(anam, -1, top)
        anode.sum = a * 100000
        anode.lockVal = anode.value / top.value
        tree.push(anode)
        for (let b = 4; b > 0; b--) {
          let bnam = 'B' + anam + b.toString()
          let bnode = new Node(bnam, -1, anode)
          bnode.sum = a * b * 10000
          bnode.lockVal = bnode.value / anode.value
          anode.children.push(bnode)
          for (let c = 4; c > 0; c--) {
            let cnam = 'C' + bnam + c.toString()
            let cnode = new Node(cnam, idx, bnode)
            cnode.sum = a * b * c * 1000
            cnode.lockVal = cnode.value / bnode.value
            cnode._idx = idx
            bnode.children.push(cnode)
            data.push(cnode)
            idx += 1
            total += cnode.sum
            console.log(cnam, anode.sum, bnode.sum, cnode.sum)
          }
        }
      }
      console.log(total)
      this.setNodes(data)
      top.total = total
      this.rawTree.top = top
      this.rawTree.tree = top.children
      this.rawTree.total = total
      return {top: top}
    }

  },

  computed: {
    ...mapGetters([
      'rawIds',
      'rawData',
      'getNodeByIdx',
      'getNodeByKey'
    ]),

    keys: function () {
      let ary = this.dataLoaded
      for (let id in this.rawIds) {
        ary.push(id)
      }
      this.selectedKey = ary[0]
      console.log('computed', ary)
      return ary
    }

  },

  watch: {
    testData: function (val, old) {
      if (val) {
        this.genData()
      } else {
        this.loadData()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hrow {
  display: inline-block;
}
.tree-view {
  display: inline-block;
  margin-left: 1em;
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
