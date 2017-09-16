<template>
  <header class="tnvheader">
    <div id="tophead">
      <img class="logo" src="../assets/tnv-logo.svg"></img>
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
    <div>
      <div id="line2" @click="expand">
        <span>{{ header }}</span><br>
        <span style="font-size: .4em;">{{ moreText }}</span>
      </div>
      <div v-if="more" class="line3" @click="expand">
        <div class="explain" v-html="explain0"></div>
        <div class="explain" v-html="explain1"></div>
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
      motto: 'Taxation with Representation',
/*      explain: 'Tax N Vote allows you to turn your ideas about how the ' +
        'US Government should spend your Tax Dollar.  A Tax Dollar is a vote ' +
        'that can be divided between any agency, bureau and department. Every ' +
        'Tax Dollar is data that is added up together to create a budget that ' +
        'is submitted to Congress. Now Congress has the President’s budget and ' +
        'the people’s budget to fight over.' */
      header:
        'Using Tax N Vote, each taxpayer can select how their taxes are spent in the U.S. Budget.',
      explain0:
        'Every taxpayer has one <span style="font-weight: bold">Tax Dollar</span> ' +
        'to divide up any way they want for any ' +
        'federal agency, bureau, and/or department. For example if 10 cents of the ' +
        '<span style="font-weight: bold">Tax Dollar</span> is allocated to the ' +
        'Department of Education, 10% of the total U.S. Budget goes to that department.',
      explain1:
        'At the end of the tax season, the data created for everybody Tax N Vote\'s ' +
        '<span style="font-weight: bold">Tax Dollar</span> is added together to get a ' +
        '<span style="font-weight: bold">People\'s Budget</span> that is given to ' +
        'Congress. It does not matter whether a person is a Democrat, a Republican, ' +
        'or an Independent because their ideas are heard.  The result is that the ' +
        '<span style="font-weight: bold">People\'s Budget</span> gives Congress a ' +
        'true representation of what is important ' +
        'to the American people, giving true <span style="font-weight: bold">Taxation with Representation.</span>',
      rightdiv: 'Need Your Help',
      more: false,
      moreText: 'MORE'
    }
  },
  methods: {
    expand (evt) {
      this.more = !this.more
      if (this.more) {
        this.moreText = 'LESS'
      } else {
        this.moreText = 'MORE'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  width: 4em;
  height: 3em;
}
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
  display: inline-block;
  float: left;
  clear: left;
  width: 100%;
  font-size: 1.5em;
  border: 1px solid black;
}
.line3 {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 5em;
  border: 1px solid black;
  z-index: 10;
  background-color: #fff;
}
.explain {
  display: inline-block;
  float: left;
  text-align: left;
  width: 100%;
  font-size: 1.2em;
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
