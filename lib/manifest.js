module.exports.generateManifest = function (packageName, { minSdkVersion = 19, targetSdkVersion = 28, maxSdkVersion = targetSdkVersion, versionCode = 1, versionName = '1.0.0' } = {}) {
  return `<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="${packageName}" android:versionCode="${versionCode}" android:versionName="${versionName}">
    <uses-sdk android:minSdkVersion="${minSdkVersion}" android:targetSdkVersion="${targetSdkVersion}" android:maxSdkVersion="${maxSdkVersion}" />
    <application />
  </manifest>`
}
