<script>
import axios from 'axios'
import nacl from 'tweetnacl'
import base64 from 'base64-js'

let url = '/tnvsrv'

export default {
  name: 'Rpc',
  data () {
    return {
//      share: null
    }
  },
  created () {
  },

  methods: {
    sendRpc (cmd, args, cb) {
      let params = args
      let id = base64.fromByteArray(nacl.randomBytes(8))
      console.log(this.share)
      axios.post(url, {
    //        jsonrpc: '2.0',
        cmd: cmd,
        id: id,
        sess: base64.fromByteArray(this.share.pkey),
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
    }
  },
  computed: {
  }
}
</script>
