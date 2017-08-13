import Vue from 'vue'

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
