<template>
  <div id="tnvapp">
    <tnv-header></tnv-header>
    <router-view></router-view>
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
  display: inline-block;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
