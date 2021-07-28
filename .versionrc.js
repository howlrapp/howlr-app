module.exports = {
  bumpFiles: [
    {
      filename: 'package.json',
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo/android'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo/ios'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('./appVersionBumper'),
    },
    {
      filename: 'eas.json',
      updater: require.resolve('./releaseChannelVersionBumper'),
    },
  ],
};
