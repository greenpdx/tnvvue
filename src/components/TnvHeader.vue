<template>
  <header class="tnvheader">

    <h1>{{ name }}</h1>
    <h4>{{ motto }}</h4>
  </header>
</template>

<script>
export default {
  name: 'TnvHeader',
  data () {
    return {
      name: 'Tax N Vote',
      motto: 'Tax N Vote repesents you Tax Dollar every year'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
