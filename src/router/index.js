import Vue from 'vue'
import Router from 'vue-router'
import TnvVote from '@/components/TnvVote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TnvVote',
      component: TnvVote
    }
  ]
})
