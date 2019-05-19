const fs = require('fs')
const { generateApk } = require('./index')

async function main() {
  const packageName = 'com.package.sample'
  const storepass = 'password'
  const alias = 'alias'
  const keypass = 'password'
  const buffer = await generateApk(packageName, storepass, alias, keypass)
  fs.writeFileSync('app-release.apk', buffer)
  console.log('generated ./app-release.apk')
}

main()
