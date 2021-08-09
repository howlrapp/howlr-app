import React, { useMemo, useCallback } from 'react';
import { Card, Text, Icon, useTheme } from '@ui-kitten/components';
import { isEmpty } from 'lodash';
import { StyleSheet, View } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { compact } from 'lodash';
import * as WebBrowser from 'expo-web-browser';
import { showMessage } from "react-native-flash-message";
import AppLink from 'react-native-app-link';

import useApp from '../../hooks/useApp';

const UserProfileProfileFieldValueItem = ({
  profileFieldValue,
  cardStyle,
  ...props
}) => {
  const theme = useTheme();
  const { profileFieldGroups } = useApp();

  const profileFields = useMemo(() => (
    profileFieldGroups.map(({ profileFields }) => profileFields).flat()
  ), [profileFieldGroups])

  const profileField = useMemo(() => (
    profileFields.find(({ name }) => profileFieldValue.name === name)
  ), [profileFields, profileFieldValue])

  const [ sanitizedValue, url ] = useMemo(() => {
    const regexp = new RegExp(profileField.regexp);
    const usernamePlaceholder = profileField.pattern.match(regexp)[1];
    const urlParts = profileField.pattern.split(usernamePlaceholder).filter((part) => part.length);

    const sanitizedValue = profileFieldValue.value.replace(urlParts[0], '');
    const url = urlParts[0] ? compact([ urlParts[0], sanitizedValue, urlParts[1] ]).join('') : null;

    return ([ sanitizedValue, url ]);
  }, [profileField, profileFieldValue.value])


  const [ deepLinkUrl, deepLinkOptions ] = useMemo(() => {
    if (!profileField.deepLinkPattern || !profileField.appStoreId || !profileField.playStoreId) {
      return [];
    }
    const deepLinkUrl = profileField.deepLinkPattern.replace('value', sanitizedValue);

    return [ deepLinkUrl, { appName: profileField.label, appStoreId: profileField.appStoreId, playStoreId: profileField.playStoreId }];
  }, [ profileField, sanitizedValue ]);

  const handlePress = useCallback(() => {
    if (deepLinkUrl) {
      AppLink.maybeOpenURL(deepLinkUrl, deepLinkOptions)
    } else if (url) {
      WebBrowser.openBrowserAsync(url);
    } else {
      Clipboard.setString(sanitizedValue);
      showMessage({
        message: "Copied to Clipboard",
      })
    }
  }, [sanitizedValue, url]);

  if (isEmpty(profileFieldValue.value)) {
    return (null);
  }

  return (
    <View
      {...props}
    >
      <Card
        style={[ cardStyle ]}
        onPress={handlePress}
      >
        {
          url ? (
            <Icon
              width={12}
              height={12}
              fill={theme["color-primary-transparent-600"]}
              name="link-2"
              style={styles.openIcon}
            />
          ) : (
            <Icon
              width={12}
              height={12}
              fill={theme["color-primary-transparent-600"]}
              name="copy"
              style={styles.openIcon}
            />
          )
        }
        <Text
          appearance="hint"
          category="c2"
          style={styles.label}
          numberOfLines={1}
        >
          {profileField.label}
        </Text>
        <Text
          category="p1"
          style={styles.value}
          numberOfLines={1}
        >
          {sanitizedValue}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  openIcon: {
    position: 'absolute',
    right: -18,
    top: -8,
  },
  value: {
    marginTop: 12
  },
  label: {
    textTransform: 'uppercase'
  }
});

export default React.memo(UserProfileProfileFieldValueItem);
