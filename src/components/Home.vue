<template>
  <div id="tnvhome">
    <div class="tnvwhat">
      <span style="font-size: 1.5em; font-weight: bold;">Vote with your Tax Dollar, Create the People's Budget</span><br> When
       a person files their taxes, they have a Tax Dollar to divide into the
       U.S. discretionary budget. At the end of the tax season, all the votes are
       aggregated to create the People's Budget.<br>
       Every person is heard, with verifiable blockchain secure documented data, not fake news or alt facts.

    </div>
    <div>
      <h4 style="margin-bottom: 0in;">Benefits of Tax N Vote:</h4>
      <ul class="tnvbenefits">
        <li>Apolitical, does not matter republican, democrat or independent</li>
        <li>Congress will really know what the people want</li>
        <li>The result is hard data, no alt-facts or fake news</li>
        <li>Zero cost to person, Tax N Vote is web or mobile based and does not cost to use</li>
        <li>Everybodys ideas and values are counted. No gerrymandering or geographicly biased</li>
        <li>Easy to use, just submit a template or adjust the budget to exactly what is wanted</li>
        <li>Advertising for templates will educate the people about the budget</li>
      <li>People will feel better about paying taxes when the think they have a voice on
        how it is spent</li>
      <li>Tax compliance will increase</li>
      <li>The results can be used to measure politicians in next election</li>
      <li>Does not take a constitutional convention to change the system</li>
      <li>Low overhead cost, the total amount of anonymous data can fit on $400 of disk space</li>
      <li>Individuals can verify their own data using the receipt number</li>
      </ul>
    </div>
    <div>
      <tnv-flow></tnv-flow>
    </div>
  </div>
</template>

<script>
import TnvFlow from './TnvFlow'

export default {
  name: 'TnvHelp',
  components: {
    'tnv-flow': TnvFlow
  },
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
  text-decoration: none;
}
.tnvwhat {
  font-size: 1.4em;
  margin-top: 1em;
}
.tnvbenefits li {
  margin-top: 10px;
}
</style>
