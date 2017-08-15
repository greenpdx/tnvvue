import Vue from 'vue'
import Router from 'vue-router'
import TnvVote from '@/components/TnvVote'
import TnvInfo from '@/components/TnvInfo'
import TnvHelp from '@/components/TnvHelp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vote',
      component: TnvVote
    },
    {
      path: '/vote',
      name: 'vote',
      component: TnvVote
    },
    {
      path: '/info',
      name: 'info',
      component: TnvInfo
    },
    {
      path: '/help',
      name: 'help',
      component: TnvHelp
    }
  ]
})
