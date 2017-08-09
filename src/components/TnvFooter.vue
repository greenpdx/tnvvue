<template>
  <footer class="tnvfooter">

    <span>{{ copyright }}</span><br>
    <span>{{ contact }}</span>
  </footer>
</template>

<script>
export default {
  name: 'TnvFooter',
  data () {
    return {
      copyright: 'Tax N Vote 2017',
      contact: 'Contact: info AT taxnvote DOT org'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tnvfooter {
  display: inline-block;
}
h1, h2 {
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
