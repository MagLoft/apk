const Keytool = require('node-keytool')
const DN = require('./dn')

const DEFAULTS = {
  validity: 10000,
  keysize: 2048,
  keyalg: 'RSA',
  sigalg: 'SHA1withRSA',
  destalias: null,
  startdate: new Date(),
  x509ext: []
}

const SYM_STORE = Symbol('store')

module.exports.Keystore = class Keystore {
  constructor(filename, storepass, options = {}) {
    this.options = Object.assign({}, DEFAULTS, options)
    this.filename = filename
    this[SYM_STORE] = Keytool(filename, storepass)
  }

  genKeyPair(alias, keypass, dname = {}) {
    return new Promise((resolve, reject) => {
      const { validity, keysize, keyalg, sigalg, destalias, startdate, x509ext } = this.options
      const dn = new DN(dname).toString()
      this[SYM_STORE].genkeypair(alias, keypass, dn, validity, keysize, keyalg, sigalg, destalias, startdate, x509ext, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  getList() {
    return new Promise((resolve, reject) => {
      this[SYM_STORE].list((error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }
}
