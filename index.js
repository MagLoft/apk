const fs = require('fs')
const tmp = require('tmp')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { Keystore } = require('./lib/keystore')
const { generateManifest } = require('./lib/manifest')

module.exports.generateApk = async function (packageName, storepass, alias, keypass, options = {}) {
  const defaults = { targetSdkVersion: 28, buildToolsVersion: '28.0.3', dname: { commonName: packageName } }
  const { targetSdkVersion, buildToolsVersion, dname } = Object.assign({}, defaults, options)
  const dir = tmp.dirSync()
  const cwd = dir.name

  // Create Keystore
  const store = new Keystore(path.join(cwd, 'keystore.jks'), storepass, options)
  await store.genKeyPair(alias, keypass, dname)

  // Create Manifest
  const manifestPath = path.join(cwd, 'AndroidManifest.xml')
  fs.writeFileSync(manifestPath, generateManifest(packageName, { targetSdkVersion }), 'utf8')

  // Create unaligned APK
  const { sigalg } = store.options
  const unalignedAPKPath = path.join(cwd, 'app-release.apk.unaligned')
  const alignedAPKPath = path.join(cwd, 'app-release.apk')
  const toolsPath = path.join(process.env.ANDROID_SDK_ROOT, `build-tools/${buildToolsVersion}`)
  const androidJar = path.join(process.env.ANDROID_SDK_ROOT, `platforms/android-${targetSdkVersion}/android.jar`)
  await exec(`${toolsPath}/aapt package -m -f -J . -M ${manifestPath} -I ${androidJar} -F ${unalignedAPKPath}`)
  await exec(`jarsigner -storepass '${storepass}' -sigalg ${sigalg} -digestalg SHA1 -keystore ${store.filename} ${unalignedAPKPath} ${alias}`)
  await exec(`jarsigner -verify ${unalignedAPKPath}`)
  await exec(`${toolsPath}/zipalign -f 4 ${unalignedAPKPath} ${alignedAPKPath}`)
  const buffer = fs.readFileSync(alignedAPKPath)
  dir.removeCallback()
  return buffer
}
