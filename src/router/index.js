import Vue from 'vue'
import Router from 'vue-router'
import TnvVote from '@/components/TnvVote'
import TnvInfo from '@/components/TnvInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TnvVote',
      component: TnvVote
    },
    {
      path: '/vote',
      name: 'TnvVote',
      component: TnvVote
    },
    {
      path: '/info',
      name: 'TnvInfo',
      component: TnvInfo
    }
  ]
})
