import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';

import useUpdateViewer from '../../hooks/useUpdateViewer';
import usePickImage from '../../hooks/usePickImage';

import UserAvatar from '../UserAvatar';

import showTransactionLoader from '../../utils/showTransactionLoader';

const AvatarUploader = ({ user, size }) => {
  const theme = useTheme();

  const [ updateViewer, { loading } ] = useUpdateViewer();
  const pickImage = usePickImage();

  const handlePickAvatar = async () => {
    const { uri } = await pickImage({
      aspect: [1, 1],
      width: Constants.manifest.extra.avatarSize,
      height: Constants.manifest.extra.avatarSize,
    });

    if (uri) {
      showTransactionLoader(() => (
        updateViewer({
          variables: {
            input: {
              avatarUrl: uri
            }
          }
        })
      ));
    }
  }

  return (
    <View
      style={[ styles.root, { height: size, opacity: loading ? 0.3 : 1 } ]}
    >
      <UserAvatar
        user={user}
        size={size}
      />
        {
          !loading && (
            <TouchableOpacity
              style={[ styles.uploadIndicator, { backgroundColor: theme['background-alternative-color-1'] } ]}
              onPress={handlePickAvatar}
              disabled={loading}
            >
              <Icon fill={theme['background-basic-color-1']} style={styles.icon} name="camera" />
            </TouchableOpacity>
          )
        }
    </View>
  );
}

const INDICATOR_SIZE = 32;

const styles = StyleSheet.create({
  root: {
    display: 'flex'
  },
  uploadIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: INDICATOR_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8
  },
  icon: {
    width: INDICATOR_SIZE / 2,
    height: INDICATOR_SIZE / 2
  }
})

export default React.memo(AvatarUploader);
