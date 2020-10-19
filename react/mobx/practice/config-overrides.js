/* config-overrides.js */
const { useBabelRc, override } = require('customize-cra')

const config = override(useBabelRc())

module.exports = config
