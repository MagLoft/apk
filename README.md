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

```js
const { generateApk } = require('apkman')

const buffer = await generateApk(packageName, storePass, alias, keyPass, options)
fs.writeFileSync('app-release.apk', buffer
```

## Options & Defaults

```js
{
  targetSdkVersion: 28,           // Target Android SDK Version
  buildToolsVersion: '28.0.3',    // Target Android Build Tools Version
  validity: 10000,                // Keystore Certificate Validity in Days
  keysize: 2048,                  // Keystore Key Size
  keyalg: 'RSA',                  // Keystore Key Algorithm
  sigalg: 'SHA1withRSA',          // Keystore Signature Algorithm
  destalias: null,                // Keystore Destination Alias
  startdate: new Date(),          // Keystore Start Date
  x509ext: [],                    // Keystore Extensions
  dname: {                        // Keystore DN Record
    commonName: 'John Doe',
    organizationUnit: 'IT',
    organizationName: 'Sample Inc.',
    localityName: 'Singapore',
    stateName: 'Singapore',
    country: 'SG'
  }
}
```

## License

`apkman` is available under an MIT-style license.
