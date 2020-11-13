import React, { useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';

import UserProfileProfileFieldValueItem from './UserProfileProfileFieldValueItem';
import useGridDimensions from '../../hooks/useGridDimensions';

const UserProfileProfileFieldValues = ({
  user,
  style
}) => {

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

  const filteredProfileFieldValues = useMemo(() => (
    user.profileFieldValues.filter(({ value}) => !isEmpty(value))
  ), [user.profileFieldValues])

  if (filteredProfileFieldValues.length === 0) {
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
        Social
      </Text>
      <View
        style={[ styles.root, style ]}
      >
        {
          filteredProfileFieldValues.map((profileFieldValue, index) => (
            <UserProfileProfileFieldValueItem
              key={profileFieldValue.id}
              profileFieldValue={profileFieldValue}
              itemDimension={itemDimension}
              cardStyle={{
                width: itemDimension - imageSpacing,
              }}
              style={{
                marginBottom: (
                  index > (filteredProfileFieldValues.length - itemsPerRow - 1) ? 0 : imageSpacing + itemPaddingCorrection
                ),
                width: itemDimension,
                paddingLeft: index % itemsPerRow * itemPaddingCorrection
              }}
            />
          ))
        }
      </View>
    </>
  )
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

export default React.memo(UserProfileProfileFieldValues);
