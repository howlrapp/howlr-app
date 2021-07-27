import React, { useMemo } from 'react';
import { Text, Icon, useTheme } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

const UserProfileNoteList = ({
  value,
  iconName,
  style,
  prefix = '',
  numberOfLines = 1,
  ...props
}) => {
  const theme = useTheme();

  const formattedValue = useMemo(() => {
    if (value.length <= 1) {
      return (`${prefix}${value}`);
    }

    const last = value[value.length - 1];
    const rest = value.slice(0, value.length - 1);

    return (
      `${prefix}${rest.join(', ')} and ${last}`
    );
  })

  if (value.length === 0) {
    return (null);
  }

  return (
    <View
      style={[ styles.root, style ]}
      {...props}
    >
      <Icon
        name={iconName}
        width={14}
        height={14}
        fill={theme['text-hint-color']}
        style={styles.icon}
      />
      <Text
        category="s2"
        numberOfLines={numberOfLines}
        appearance="hint"
        ellipsizeMode='tail'
      >
        {formattedValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
    maxWidth: '80%',
  },
  icon: {
    marginRight: 3,
  }
});

export default React.memo(UserProfileNoteList);
