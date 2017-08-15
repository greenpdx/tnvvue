<template>
  <header class="tnvheader">
    <div id="tophead">
      <div id="name">
        <span>{{ name }}</span>
      </div>
      <div id="motto">
        <span>{{ motto }}</span>
      </div>
      <div id="rightdiv">
        <router-link to="/help">{{ rightdiv }}</router-link>
      </div>
    </div>
    <div id="line2">
      <div id="explain">
        <p>{{ explain }}</p>
      </div>
    </div>
    <nav>
      
    </nav>
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
        'to how you want your Tax Dollar Spent',
      rightdiv: 'Need Your Help'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tnvheader {
  display: block;
  flex-direction: column;
  width: 100%;
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
  width: 100%;
}
#line2 {
  width: 100%;
  display: block;
}
#explain {
  display: inline-block;
  float: left;
  clear: left;
  width: 37em;
  font-size: 1.5em;
  border: 1px solid black;
}
.smaller {
  font-size: .8em;
}
#rightdiv {
  float: right;
  display: inline-block;
  border: 2px solid red;
  font-size: 2em;
  background-color: yellow;

}

</style>
