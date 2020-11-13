import React, { useMemo } from 'react';
import { orderBy } from 'lodash';
import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import useGridDimensions from '../../hooks/useGridDimensions';

import UserProfileGroupsItem from './UserProfileGroupsItem';

const UserProfileGroups = ({
  groups,
  style,
  title,
  ...props
}) => {
  const sortedGroups = useMemo(() => (
    orderBy(groups, 'name', 'asc')
  ), [groups])

  const {
    itemDimension,
    itemPaddingCorrection,
    itemsPerRow,
    imageSpacing,
  } = useGridDimensions({
    itemsPerRowDivider: 2,
    itemsSectionPadding: 20,
    imageSpacing: 4
  });

  if (groups.length === 0) {
    return (null);
  }

  return (
    <>
      <Text
        appearance="hint"
        category="label"
        style={styles.title}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View
        style={[ styles.root, style ]}
        {...props}
      >
        {
          sortedGroups.map((group, index) => (
            <UserProfileGroupsItem
              key={group.id}
              group={group}
              style={{
                marginBottom: (
                  index > (sortedGroups.length - itemsPerRow - 1) ? 0 : imageSpacing + itemPaddingCorrection
                ),
                width: itemDimension,
                paddingLeft: index % itemsPerRow * itemPaddingCorrection
              }}
              cardStyle={{
                width: itemDimension - imageSpacing
              }}
            />

          ))
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    marginLeft: 20,
    marginBottom: 5
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
})

export default React.memo(UserProfileGroups);
