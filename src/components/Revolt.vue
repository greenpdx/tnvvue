<template>
  <div id="tnvrevolt">
    <div class="injrev">
      <span style="color: #00c">When Injustice is Law</span><br>
      <span style="color: #c00">Revolution is Necessary</span>
    </div>
    <!-- img src="../assets/images/injust-bumper.png" -->
    <div style="text-align: left; font-size: 1.5em;">
      <pre>
        <a target="_blank" href="https://www.merriam-webster.com/dictionary/revolution">Definition of Revolution:</a>
        2 c: activity or movement designed to effect fundamental changes in the socialeconomic situation
      </pre>
    </div>
    <div style="text-align: left;">
      <p>
        Tax N Vote is a non-violent revolution. It changes the socialeconomic
        of the people of America by giving them a greater say in where their
        Tax Dollars are spent. There is so much money between the People and
        the federal government. It is time for the People to let Congress really
        know what is important to them. It is time to add a need feed back system
        to the government
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Revolt',
  data () {
    return {
      helpwrite: ''
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
.injrev {
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
</style>
