/* eslint-disable  @typescript-eslint/no-require-imports */
const ossign = require('@ossign/ossign');

module.exports.sign = (path) => {
    console.log("Signing Path: ", path);
    ossign.SignSync(path.path, path.path, 'pecoff');
}
