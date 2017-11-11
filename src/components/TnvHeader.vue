<template>
  <header class="tnvheader">
    <div id="tophead">
      <img class="logo" src="../assets/tnv-logo.svg"></img>
      <div id="name">
        <router-link to="/home">{{ name }}</router-link>
      </div>
      <div id="motto">
        <span>{{ motto }}</span>
      </div>
      <div id="rightdiv">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" v-model="value">
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
        </form>
        <!-- router-link to="/help">{{ rightdiv }}</router-link -->
      </div>
    </div>
    <div>
      <div id="line2">
        <router-link :to="{ name: 'vote', params: {} }" id="voteview">
          <div class="injrev">
            <span style="color: #00c">Vote with your Tax Dollar</span><br>
            <span style="color: #c00">Create the People's Budget</span>
          </div>
        </router-link>
        <!-- span style="font-size: .4em;">{{ moreText }}</span -->
      </div>
      <!-- div v-if="more" class="line3" @click="expand">
        <!-- span id="votepage">Vote</span></router-link -->
        <!-- div class="explain" v-html="explain0"></div>
        <div class="explain" v-html="explain1"></div -->
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
      value: '6VG6GPBCPH89U',
      name: 'Tax N Vote',
      motto: 'Taxation with Representation',
/*      explain: 'Tax N Vote allows you to turn your ideas about how the ' +
        'US Government should spend your Tax Dollar.  A Tax Dollar is a vote ' +
        'that can be divided between any agency, bureau and department. Every ' +
        'Tax Dollar is data that is added up together to create a budget that ' +
        'is submitted to Congress. Now Congress has the President’s budget and ' +
        'the people’s budget to fight over.' */
      header:
        'Vote with your Tax Dollar',

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
.injrev {
  text-align: center;
  font-size: 2em;
  font-family: arial;
  font-weight: bold;
  background-color: yellow;
  text-shadow:
  -2px -2px #000,
  2px -2px #000,
  -2px 2px #000,
  2px 2px #000;
  border: 2px solid #000;
  cursor: pointer;
}
#voteview {
  text-decoration-line: dashed;
  text-decoration-color: #ff0;
  text-decoration-style: wavy;
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
  white-space: nowrap;
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
#votepage {
  font-size: 3em;
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
  background-color: #6f6;
  vertical-align: middle;
}

</style>
