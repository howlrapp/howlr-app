import React from 'react';
import { Text, Divider, useTheme } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';
import EnrichedText from './EnrichedText';

const ProfileItem = ({
  label,
  value,
  style,
  ...props
}) => {
  const theme = useTheme();

  if (isEmpty(value) && !children) {
    return (null);
  }

  return (
    <View
      style={[ style ]}
      {...props}
    >
      <Divider />
      <View
        style={[ styles.content, { backgroundColor: theme['background-basic-color-1'] } ]}
      >
        {
          label && (
            <Text
              appearance="hint"
              category="label"
              style={styles.label}
            >
              {label}
            </Text>
          )
        }
        {
          value && (
            <Text
              category="p1"
            >
              <EnrichedText body={value} />
            </Text>
          )
        }
      </View>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 4,
    textTransform: 'uppercase'
  }
});

export default React.memo(ProfileItem);
