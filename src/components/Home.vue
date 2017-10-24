<template>
  <div id="tnvhome">
    <div class="injrev">
      <span style="color: #00c">When Injustice is Law</span><br>
      <span style="color: #c00">Revolution is Necessary</span>
    </div>
    <div class="tnvwhat">Tax N Vote fundamentally changes the political system in a non-violent way to give
      the People of America more feedback to Congress
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TnvHelp',
  data () {
    return {
      helpwrite: 'Home'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tnvhome {
  display: inline-block;
  height: 100%;
  width: 100%;
  text-align: left;
  margin-top: 2em;
}
.injrev {
  text-align: center;
  font-size: 4em;
  font-family: arial;
  font-weight: bold;
  background-color: yellow;
  text-shadow:
  -2px -2px #000,
  2px -2px #000,
  -2px 2px #000,
  2px 2px #000;
  border: 2px solid #000;
}
.tnvwhat {
  font-size: 2em;
  margin-top: 1em;
}
</style>
