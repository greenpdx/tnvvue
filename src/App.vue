<template>
  <div id="tnvapp">
    <tnv-header></tnv-header>
    <div id="main">
      <div id="navtab">
        <!-- router-link :to="{ name: '', params: {} }"></router-link -->
        <router-link :to="{ name: 'vote', params: {} }">Home</router-link>
        <router-link :to="{ name: 'info', params: {} }">Info</router-link>
      </div>
      <section>
        <router-view></router-view>
      </section>
    </div>
    <tnv-footer></tnv-footer>
  </div>
</template>

<script>
import TnvFooter from '@/components/TnvFooter'
import TnvHeader from '@/components/TnvHeader'

export default {
  name: 'tnvapp',
  components: {
    'tnv-header': TnvHeader,
    'tnv-footer': TnvFooter
  }
}
</script>

<style>
#tnvapp {
  display: block;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
#navtab {
  font-size: 2em;
  text-align: left;
}
#main {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
