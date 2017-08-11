var merge = require('webpack-merge')
var prodEnv = require('./dev.env')

module.exports = merge(devEnv, {
//  DBURL: 'http://10.0.42.81:8181/docs/local/budget/full?limit=0'
})
