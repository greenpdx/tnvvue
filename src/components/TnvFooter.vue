<template>
  <footer class="tnvfooter">

    <span>{{ copyright }}</span><br>
    <span>Contact: <a href="mailto:info@taxnvote.org?Subject=Tax N Vote information">{{ contact }}</a></span>
  </footer>
</template>

<script>
export default {
  name: 'TnvFooter',
  data () {
    return {
      copyright: 'Tax N Vote 2017',
      contact: 'info@taxnvote.org'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tnvfooter {
  display: block;
  position: relative;
  bottom: 0;
  width: 100%;
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
