import Vue from 'vue'
import Router from 'vue-router'
import TnvVote from '@/components/TnvVote'
import TnvInfo from '@/components/TnvInfo'
import TnvHelp from '@/components/TnvHelp'
import Login from '@/components/Login'
import Revolt from '@/components/Revolt'
import Contact from '@/components/Contact'
import PPCancel from '@/components/PPCancel'
import PPThankYou from '@/components/PPThankYou'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
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
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/revolt',
      name: 'revolt',
      component: Revolt
    },
    {
      path: '/help',
      name: 'help',
      component: TnvHelp
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: {other: {}, crypt: {}}

    },
    {
      path: '/cancel',
      name: 'cancel',
      component: PPCancel
    },
    {
      path: '/thankyou',
      name: 'thankyou',
      component: PPThankYou
    }
  ]
})
