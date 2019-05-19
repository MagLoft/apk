# APK

> Generate blank signed Android APKs as placeholder apps for Google Play Console

## Description

The Google Play Developer API only allows you to create edits once a first APK has been uploaded.
This package helps you generate a minimal signed APK that can be used for exactly that.
Once uploaded, you can interact with the Google Play Developer API via the specified packageName.

## Installation

`yarn add apk`

OR

`npm install apk`

## Usage

```js
const { generateApk } = require('apk')

const buffer = await generateApk(packageName, storePass, alias, keyPass)
fs.writeFileSync('app-release.apk', buffer
```

## License

`apk` is available under an MIT-style license.
