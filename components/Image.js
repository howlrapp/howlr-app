import React from 'react';
import FastImage from 'react-native-fast-image';
import Constants from 'expo-constants';

const Image = ({ source, ...props }) => {
  if (source.uri && source.uri[0] === '/') {
    /*
     * When we only get a path from the server we assume that files are stored
     * on the same host as the GraphQL endpoint
     */
    const uri = (
      process.env.NODE_ENV === 'development' ? Constants.manifest.extra.developmentApiUrl : Constants.manifest.extra.developmentApiUrl
    ).replace(/\/[^\/]*$/, source.uri);

    return (
      <FastImage source={{ uri }} {...props} />
    );
  }

  return (
    <FastImage source={source} {...props} />
  )
}

export default React.memo(Image);
