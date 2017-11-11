<template>
  <div id="contact">
    <h3>
      Tax N Vote needs your support.
    </h3>
    <div>
      <h4>Donate using PayPal</h4>
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" v-model="value">
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>
    </div>
    <table class="tbl-data">
      <tr>
        <td class="tdtitle">EMail:</td>
        <td><a href="mailto:info@taxnvote.org?Subject=Tax N Vote information">{{ emailaddr }}</a></td>
      </tr>
      <tr>
        <td class="tdtitle">twitter </td>
        <td style="vertical-align: middle;">
          <img src="../assets/images/Twitter_Logo_Blue.png" width="40px" height="40px" style="border: -5px;"></img>
          <span style="text-align: center;">@taxnvote</span>
        </td>
      </tr>
      <tr>
        <td class="tdtitle">github source</td>
        <td>
          <img src="../assets/images/Octocat.jpg" width="30px" height="30px">
          <a href="https://github.com/greenpdx/tnvvue">github/greenpdx/tnvvue</a>
        </td>
      </tr>
      <tr>
        <td class="tdtitle">github taxnvote</td>
        <td>
          <img src="../assets/images/Octocat.jpg" width="30px" height="30px">
          <a href="https://github.com/greenpdx/taxnvote">github/greenpdx/taxnvote</a>
        </td>
      </tr>
    </table>

</div>

</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      value: '6VG6GPBCPH89U',
      emailaddr: 'info@taxnvote.org',
      linkedinurl: 'https://www.linkedin.com/company/taxnvote',
      twitterId: '@TaxNVote',
      githubTNV: 'https://github.com/greenpdx/taxnvote',
      githubWeb: 'https://github.com/greenpdx/tnvvue'
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
.tbl-data {
  vertical-align: middle;
}
.tdtitle {
  text-align: right;
}
td {
  text-align: left;
  height: 30px;
  vertical-align: middle;
}
</style>
