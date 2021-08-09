import React, { useEffect } from 'react';
import { MenuItem } from '@ui-kitten/components';
import { Alert } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useLazyQuery } from '@apollo/client';
import { showMessage } from "react-native-flash-message";

import { GET_VIEWER_DEEP } from '../../hooks/useGetViewerDeep';

const DataConservationLink = () => {
  const [ getViewerDeep, { loading: getViewerDeepLoading, data }] = useLazyQuery(GET_VIEWER_DEEP, {
    fetchPolicy: "no-cache"
  });
  useEffect(() => {
    if (getViewerDeepLoading) {
      showMessage({
        message: "Downloading data",
        autoHide: false,
        hideOnPress: false,
        withLoader: true,
      });
    }
  }, [getViewerDeepLoading]);

  useEffect(() => {
    if (data) {
      Clipboard.setString(JSON.stringify(data));
      showMessage({
        message: "Copied to clipboard"
      });
    }
  }, [data]);

  const handleLogout = () => {
    Alert.alert(
      'Download all your data',
      'All your data including your likes, chats and private messages will be copied into your clipboard',
      [
        {
          text: 'Proceed',
          onPress: () => {
            getViewerDeep();
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <MenuItem
      title="Download all your data"
      onPress={handleLogout}
    />
  );
}

export default React.memo(DataConservationLink);
