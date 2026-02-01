/* eslint-disable  @typescript-eslint/no-require-imports */
const ossign = require('@ossign/ossign');

module.exports.sign = ossign.GetSignerFunctionSync('pecoff');
