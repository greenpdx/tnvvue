var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  DBURL: 'http://10.0.42.81:8181/docs/local/budget/full?limit=0'
})
