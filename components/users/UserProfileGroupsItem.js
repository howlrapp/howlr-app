import React, { useMemo } from 'react';
import { Card, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import useApp from '../../hooks/useApp';

const UserProfileGroupsItem = ({
  group: { name, groupCategoryId },
  style,
  cardStyle,
  ...props
}) => {
  const { groupCategories } = useApp();

  const groupCategory = useMemo(() => (
    groupCategories.find(({ id }) => id === groupCategoryId)
  ), [groupCategories, groupCategoryId]);

  return (
    <View
      style={style}
    >
      <Card
        style={cardStyle}
        {...props}
      >
        <Text
          numberOfLines={1}
          category="c2"
          appearance="hint"
          style={styles.label}
        >
          {groupCategory.label}
        </Text>
        <Text
          numberOfLines={1}
          category="p1"
          style={styles.value}
        >
          {name}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textTransform: 'uppercase'
  },
  value: {
    marginTop: 12
  }
});

export default React.memo(UserProfileGroupsItem);
