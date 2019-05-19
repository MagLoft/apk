const ATTRIBUTE_MAP = {
  commonName: 'CN',
  organizationUnit: 'OU',
  organizationName: 'O',
  localityName: 'L',
  stateName: 'S',
  country: 'C'
}

module.exports = class DN {
  constructor(params = {}) {
    for (const key of Object.keys(ATTRIBUTE_MAP)) {
      this[key] = params[key] || null
    }
  }

  toString() {
    const pairs = []
    for (const [key, value] of Object.entries(ATTRIBUTE_MAP)) {
      if (this[key]) {
        pairs.push(`${value}=${this[key]}`)
      }
    }
    return pairs.join(',')
  }
}
