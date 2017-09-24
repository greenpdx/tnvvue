<script>
import axios from 'axios'
import nacl from 'tweetnacl'
import base64 from 'base64-js'

let url = 'http://10.0.42.104:3030'

function rdSession () {
  let pkey = sessionStorage.getItem('pkey')
  let skey = sessionStorage.getItem('skey')
  let ts = sessionStorage.getItem('ts')

  if (ts && ts + 10 > Date.now()) {
    skey = null
    console.log('new')
  }

  let key = {sess: '', key: ''}
  if (!skey) {
    key = nacl.box.keyPair()
    console.log(key.secretKey.length)
    wrSession({key: key})
  } else {
    console.log(pkey, skey)
    key.sess = base64.toByteArray(pkey)
    key.key = base64.toByteArray(skey)
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
  sess: '',
  nonce: '',
  salt: '',
  pkey: '',
  pnonce: '',
  email: ''
}

export default {
  name: 'Rpc',
  data () {
    return {
      share: null,
      key: share.key,
      sess: share.sess
    }
  },
  beforeCreate () {
//    this.key = null
//    this.sess = null
    console.log('RPC before')
  },
  created () {
    console.log('RPC created')
    this.share = share
  },

  methods: {
    sendRpc (cmd, args, cb) {
      let params = args
      let id = base64.fromByteArray(nacl.randomBytes(8))
      axios.post(url, {
    //        jsonrpc: '2.0',
        cmd: cmd,
        id: id,
        sess: base64.fromByteArray(this.share.sess),
        params: params
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      })
        .then(response => {
          let rslt = response.data.result
          let error = response.data.error
          // check rslt.id
          console.log(response, id)
          cb(rslt, error)
        })
        .catch(e => {
          cb(e, false)
        })
    },
    rdSession () {
      return rdSession()
    }
/*    get email () {
      return share.email
    },
    set email (em) {
      share.email = em
    },
    set key (k) {
      this.key = k
    },
    set sess (s) {
      this.sess = s
    },
    getEmail () {

    } */
  },
  computed: {
  }
}
</script>
