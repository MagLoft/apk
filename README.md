# APKMAN

> Generate blank signed Android APKs as placeholder apps for Google Play Console

## Description

The Google Play Developer API only allows you to create edits once a first APK has been uploaded.
This package helps you generate a minimal signed APK that can be used for exactly that.
Once uploaded, you can interact with the Google Play Developer API via the specified packageName.

## Installation

`yarn add apkman`

OR

`npm install apkman`

## Usage

Using a new Keystore
```js
const { generateApk, Keystore } = require('apkman')

const store = new Keystore('./keystore.jks', 'mystorepass')
await store.create('myalias', 'mykeypass')

const buffer = await generateApk('com.package.example', store, 'myalias', 'mykeypass')
fs.writeFileSync('app-release.apk', buffer
```

Using an existing Keystore
```js
const { generateApk, Keystore } = require('apkman')

const store = new Keystore('./keystore.jks', 'mystorepass')
await store.verifyKey('myalias', 'mykeypass')

const buffer = await generateApk('com.package.example', store, 'myalias', 'mykeypass')
fs.writeFileSync('app-release.apk', buffer
```

## Methods

Initialize Keystore:
```js
new Keystore(filename, storepass, options = {
  validity: 10000,                // Keystore Certificate Validity in Days
  keysize: 2048,                  // Keystore Key Size
  keyalg: 'RSA',                  // Keystore Key Algorithm
  sigalg: 'SHA1withRSA',          // Keystore Signature Algorithm
  destalias: null,                // Keystore Destination Alias
  startdate: new Date(),          // Keystore Start Date
  x509ext: [],                    // Keystore Extensions
})
```

Create new key:
```js
await keystore.create(alias, keypass, dname = {
  commonName: 'John Doe',
  organizationUnit: 'IT',
  organizationName: 'Sample Inc.',
  localityName: 'Singapore',
  stateName: 'Singapore',
  country: 'SG'
})
```

Verify existing key:
```js
await keystore.verifyKey(alias, keypass)
```

Generate APK:
```js
await apkman.generateApk(packageName, keystore, alias, keypass, options = {
  targetSdkVersion: 28,           // Target Android SDK Version
  buildToolsVersion: '28.0.3',    // Target Android Build Tools Version
})
```

## Synopsis

```
apkman create [packageName] [keystorePath] [apkPath]

Create android APK at outputPath

Arguments:
  packageName   desired APK package name
  keystorePath  existing or desired Keystore output path
  apkPath       desired APK output path

Options:
  -s, --storepass                                     [default: random password]
  -a, --alias                                                   [default: "app"]
  -k, --keypass                                       [default: random password]
  -f, --force      override existing keystore         [boolean] [default: false]
  -v, --verbose    print verbose output               [boolean] [default: false]
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
```

## License

`apkman` is available under an MIT-style license.
