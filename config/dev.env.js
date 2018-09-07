'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

 

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  gobleNetPort:'"//api.wqbol.net"', 
  _gobleNetPort:'"//api.wqbol.com"', 
  innerGobleNetPort:"'//host.wqbol.net'",
  businessLicensePort:'"//dm-58.data.aliyun.com"',
  idCardPort:'"//dm-51.data.aliyun.com"',
  weixinAuth:'"//share.wqbol.com/share/Share"',
})
