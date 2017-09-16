<template>
  <div id="tnvapp">
    <tnv-header></tnv-header>
    <div id="main">
      <div id="navtab">
        <!-- router-link :to="{ name: '', params: {} }"></router-link -->
        <router-link :to="{ name: 'vote', params: {} }">Vote</router-link>
        <router-link :to="{ name: 'info', params: {} }">About</router-link>
        <router-link :to="{ name: 'login', params: {} }">Login</router-link>
      </div>
      <section>
        <router-view></router-view>
      </section>
    </div>
    <tnv-footer></tnv-footer>
  </div>
</template>

<script>
import nacl from 'tweetnacl'
import base64 from 'base64-js'
import Rpc from '@/components/Rpc'

import TnvFooter from '@/components/TnvFooter'
import TnvHeader from '@/components/TnvHeader'

function rdSession () {
  let pkey = sessionStorage.getItem('pkey')
  let skey = sessionStorage.getItem('skey')
  let ts = sessionStorage.getItem('ts')

  if (ts && ts + 10 > Date.now()) {
    skey = null
    console.log('new')
  }

  let key = {publicKey: '', secretKey: ''}
  if (!skey) {
    key = nacl.box.keyPair()
    console.log(key.secretKey.length)
    wrSession({key: key})
  } else {
    console.log(pkey, skey)
    key.publicKey = base64.toByteArray(pkey)
    key.secretKey = base64.toByteArray(skey)
  }
  return key
}
function wrSession (conf) {
  let key = conf.key
  let pkey = base64.fromByteArray(key.publicKey)
  let skey = base64.fromByteArray(key.secretKey)
  sessionStorage.setItem('pkey', pkey)
  sessionStorage.setItem('skey', skey)
  sessionStorage.setItem('ts', Date.now())
}

const share = {
  key: '',
  nonce: '',
  salt: '',
  pkey: '',
  pnonce: '',
  email: ''
}

export default {
  name: 'tnvapp',
  mixins: [
    Rpc
  ],
  components: {
    'tnv-header': TnvHeader,
    'tnv-footer': TnvFooter
  },
  beforeCreate () {
    this.share = share
    let conf = rdSession()
    this.share.key = conf
    this.share.nonce = nacl.randomBytes(nacl.box.nonceLength)
  },
  created () {
    console.log('HELLO>', this.nonce)
    this.sendRpc('hello', {
      hello: base64.fromByteArray(this.share.nonce)
    }, (rslt, error) => {
      if (!error) { // rslt is just json data
        if (rslt.hello.length === 44) {
          this.share.pkey = base64.toByteArray(rslt.hello)
          this.share.fast = nacl.box.before(this.share.pkey, this.share.key.secretKey)
          console.log('HELLO<', rslt, this.share.pkey, this.share.fast)
        } else {
          alert('Stop Hacking')
          window.location.assign('/hacking?trys=many')
        }
      } else { // the rslt is the response
        console.log('HELLO!', rslt)
      }
    })
  }

}
</script>

<style>
#tnvapp {
  display: block;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
#navtab {
  font-size: 2em;
  text-align: left;
}
#main {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
