const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: [
              '@ui-kitten/components',
              '@codler/react-native-keyboard-aware-scroll-view',
              '@react-native-community/viewpager',
            ]
        }
    }, argv);
    return config;
};
