<template>
  <div id="tnvinfo">
    <div style="float: left;">
      <tnv-flow></tnv-flow>
    </div>
    <div>
      <div class="infotext" v-html="infoHtml"></div>
    </div>
  </div>
</template>

<script>
import TnvFlow from './TnvFlow'

export default {
  name: 'TnvInfo',
  components: {
    'tnv-flow': TnvFlow
  },
  data () {
    return {
      infoHtml: `
        <p style="margin-bottom: 0in; line-height: 150%">Currently political
        parties submit candidates and then try to influence the people to
        vote for them. The election process uses a huge amount of money to
      filter the peoples ideas into votes for people that “represent
      their ideas”. This money is used for advertising, rallies and
      logistics trying to make people think that the politicians know what
      is best for them.  The cost of the 2016 federal election was $6.8
      billion dollars and that does not include state and local elections.
      The presidential election really only comes down to approximately 7
      state that decides the victor. When they do get elected, they are
      continually reminded what is important to the “people” by the
      lobbyist.  The lobbyist spend over $3
      billion a year trying to influence Congress and the President. Right
      now the approval rating of Congress is 15%. The biggest problem is
      that elections are the only feedback to the politicians.</p>

      <p style="margin-bottom: 0in; line-height: 150%">What Tax N Vote does
      is add a new feedback mechanism to the federal government. People
      spend their money on what is important to them.  Tax N Vote allow the
      people to tell Congress what is important to them by submitting a
      People’s Budget to Congress. This budget is a aggregate of what is
      important to all the people.
      </p>

      <p style="margin-bottom: 0in; line-height: 150%">Tax N Vote starts
      the process by allowing the people to adjust the discretionary budget
      to match their ideas and values. Pre-configured budgets can be loaded
      from templates. This option allow people to still submit their ideas
      with out having to become experts on the US Budget. This data is
      filed with their taxes so the validity can be verified by a method
      that insure security and privacy.</p>

      <p style="margin-bottom: 0in; line-height: 150%">The IRS only
      verifies the format and anonymize the data creating a receipt that is
      sent back to the taxpayer. This anonymous data is send to the Census
      Bureau. The receipt allows the taxpayer to verify their data in the
      database. The aggregate data is kept secret until after the tax
      season.  Then it is sent to the Congressional Budget Office for
      analysis.  The CBO prepares the Peoples Budget and submits it to
      Congress.
      </p>

      <h4 style="margin-bottom: 0in;">Benefits of Tax N Vote:</h4>
      <ul>
        <li/>
        Apolitical, does not matter republican, democrat or independent
        <li/>
        Zero cost to person, Tax N Vote is web or mobile based and does not cost to use
        <li/>
        Everybodys ideas and values are counted. No gerrymandering or geographicly biased
        <li/>
      Advertising for templates will educate the people about the budget
        <li/>
      The results can be used to measure politicians in next election
        <li/>
      Congress will really know what the people want
        <li/>
      Individuals can verify their own data using the receipt number
        <li/>
      People will feel better about paying taxes when the think they have a voice on
        how it is spent
        <li/>
      Tax compliance will increase
        <li/>
      Does not take a constitutional convention to change the system
        <li/>
      Low overhead cost, the total amount of anonymous data can fit on $400 of disk space
        <li/>
      Easy to use, just submit a template or adjust the budget to exactly what is wanted
        <li/>
      The result is hard data, no alt-facts or fake news
      </ul>
      `
    }
  },
  computed: {
//    infoHtml () {
//      return require('@/assets/TNV-info-page.html')
//    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.infotext {
  text-align: left;
  font-size: 2em;
  line-height: 1.4em;
}
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
