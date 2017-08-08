<template>
  <header class="tnvheader">
    <div id="tophead">
      <div id="name">
        <span>{{ name }}</span>
      </div>
      <div id="motto">
        <span>{{ motto }}</span>
      </div>
    </div>
    <div id="explain">
      <p>{{ explain }}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TnvHeader',
  data () {
    return {
      name: 'Tax N Vote',
      motto: 'Your Tax Dollar repesents your ideas in a People\'s Budget',
/*      explain: 'Tax N Vote allows you to turn your ideas about how the ' +
        'US Government should spend your Tax Dollar.  A Tax Dollar is a vote ' +
        'that can be divided between any agency, bureau and department. Every ' +
        'Tax Dollar is data that is added up together to create a budget that ' +
        'is submitted to Congress. Now Congress has the President’s budget and ' +
        'the people’s budget to fight over.' */
      explain:
        'Adjust the 2016 US Discretionary Budget ' +
        'to how you want your Tax Dollar Spent'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tnvheader {
  display: flex;
  flex-direction: column;
}
#name {
  float: left;
  width: 6em;
  font-size: 3em;
  font-weight: bold;
}
#motto {
  font-size: 2em;
  text-align: center;
  margin: auto;
  margin-left: 1em;
  width: 28em;
}
#tophead {
  display: inline-flex;
  flex-direction: row;
  float: left;
}
#explain {
  display: inline-block;
  float: left;
  clear: left;
  width: 37em;
  font-size: 2em;
  border: 1px solid black;
}

</style>
