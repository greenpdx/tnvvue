<template>
<div class="tnvvote">
  <div class="split">
    <div id="three3d" class="three3d" ref="three3d">
    <div>
      <span>{{ howTo0 }}</span><br />
      <span>{{ howTo1 }}</span>
    </div>
      <div class="render-area">
        <tnv-3d v-if="top"
          :top="top"
          :size="threeSize"
          :camPos="camPos"
          :freeze="freeze">
        </tnv-3d>
        <div v-show="showInfo" class="infopop" ref="infopop">
          <div v-html="objInfo"></div>
        </div>
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
    <div class="tnv-tree">
      <tree-view v-if="top" :top="top">
      </tree-view>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import * as THREE from 'three'
import axios from 'axios'
import Node from '@/lib/Node'

import Tnv3D from './tnv3d/Tnv3D'
import TreeView from './tnvtree/TreeView'

import TestData from '@/assets/TestData'

export default {
  name: 'TnvVote',

  components: {
    'tnv3d': Tnv3D,
    'tree-view': TreeView
  },

  data () {
    return {
      objInfo: '',
      threeSize: {
        x: '800',
        y: '800'
      },
      howTo0:
        'MouseDown to change view, ScrollWheel to zoom, Hover displays Agency',
      howTo1:
        'DoubleClick on hex to select agency, DoubleClick on 3D back ground to freeze',
      grppos: {
        'x': 0,
        'y': 10,
        'z': 0
      },
      beacat: ['discretionary'],
      year: 2016,
      selectedYear: 2016,
      data: {},
      nodes: [],
      size: {
        x: 800,
        y: 800
      },
      camPos: {
        x: 50,
        y: 150,
        z: 100
      },
      freeze: {},
      top: null,
      test: false,
      rawTree: {}
    }
  },

  beforeCreate () {
  },

  created () {
    if (this.test) {
      this.td = new TestData()
      this.haveData(this.td.genData(6, 6, 6).top)
    } else {
      this.getData()
    }

//    let rand = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1))
  },

  mounted () {
  },

  computed: {
    ...mapGetters({
      hoverNode: 'hoverNode',
      selectNode: 'selectNode',
      expandNode: 'expandNode'
    }),

    showInfo: function () {
      if (this.hoverNode !== null) {
        let node = this.hoverNode
        let str = ''
        str += node.name + '<br />'
        str += node.value + '<br />'

//        str += Math.round(obj.loc.x * 100) / 100 +
//          ', ' + Math.round(obj.loc.y * 100) / 100 +
//          ', ' + Math.round(obj.loc.z * 100) / 100
        this.objInfo = str
        return true
      } else {
        this.objInfo = ''
        return false
      }
    }
  },

  methods: {
    ...mapActions([
      'setActive',
      'setExpand'
    ]),
    sortSum (a, b) {
      a.lockVal = a.value / a.parent.value
      b.lockVal = b.value / b.parent.value
      if (a.sum > b.sum) { return -1 }
      if (a.sum < b.sum) { return 1 }
      return 0
    },

    groupData (nodes, filterCB) {
      let map = {}
      let total = 0
//      Node.clrNodes()
      let top = new Node('Total', 0, null)
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

    haveData (data) {
      this.data = data
      if (this.test) {
        this.top = this.data
        this.setExpand(this.top)
      } else {
        let rslt = this.groupData(data, this.filterData)
        console.log(rslt.tree.children.length)
        this.top = rslt.tree
      }
    },
    range (min, max) {
      let ary = []
      for (let i = max; i >= min; i--) {
        ary.push(i)
      }
      return ary
    },
    onClick (evt) {
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

    loadClick (evt) { // try bezier  gre/bezier-easing
      let camera = this.$refs.camera0
      let sel = this.selectObj
      let old = camera.curObj.position
      console.log('CAM', old)
      if (sel !== null) {
        console.log(sel.loc) // just change

        /*        let dif.x = (old.x - sel.loc.x) / 100
              let dif.y = (old.y - sel.loc.y) / 100
              let dif.z = (old.z -sel.loc.z) / 100
              let cnt =
              let id = setInterval(function () {
                if (cnt-- < 0) {

                }
                camera.curObj.position.set(sel.loc.x, sel.loc.y + 50, sel.loc.z)
                camera.curObj.lookAt(new THREE.Vector3(sel.loc.x, sel.loc.y, sel.loc.z))
              }, 10) */
      }
    },

    clrClick (evt) {
      this.clearNodes()
    },
    clickIt (evt) {
      console.log(evt)
    },
    zoomIn (node) {

    },
    dumpClick (evt) {
      let nodes = this.getNodes
      nodes.forEach((itm, idx) => {
        let val = this.getNodeById(itm._id)
        val.then(node => console.log(itm._id, node._id))
      })
      let itm = this.getNodeById(this.tstId)
      itm.then(node => console.log(this.tstId, node._id))
    },
    getData () {
      let self = this
      axios.get('http://10.0.42.81:8181/docs/local/budget/full?limit=0')
        .then(response => {
          let rslt = response.data
          let data = rslt.data
          self.haveData(data)
//          self.setNodes(data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tnvvote {
  display: inline-block;
}

.split {
  display: flex;
}
.three3d {
  display: block;
  float: left;
}

.render-area {
  display: inline-block;
  position: relative;
  height: 800px;
  width: 800px
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

.tnv-tree {
  display: inline-block;
  margin-left: 1em;
  float: right;
  width: 45%;
  text-align: left;
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
