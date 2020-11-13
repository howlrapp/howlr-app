import React from 'react';
import { ActivityIndicator as ReactActivityIndicator, Platform } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const ActivityIndicator = (props) => (
  Platform.OS === 'ios' ? <ReactActivityIndicator /> : <Spinner {...props} />
)

export default React.memo(ActivityIndicator);
