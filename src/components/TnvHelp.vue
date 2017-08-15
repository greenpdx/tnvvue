<template>
  <div id="tnvhelp">
    {{ helpwrite }}
  </div>
</template>

<script>
export default {
  name: 'TnvHelp',
  data () {
    return {
      helpwrite: 'We need help writting information about Tac N Vote'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tnvhelp {
  display: block;
  height: 100%;
  width: 100%;
  text-align: left;
  margin-top: 2em;
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
