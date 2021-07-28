import React, { useMemo } from 'react';
import { MenuGroup, MenuItem, Text, CheckBox } from '@ui-kitten/components';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { truncate } from 'lodash';

const CheckBoxMenuGroup = ({
  title,
  items,
  selectedItemIds = [],
  onChange
}) => {

  const selectedItemsLabel = useMemo(() => (
    items
      .filter(({ id }) => selectedItemIds.includes(id))
      .map(({ label }) => label)
      .join(', ')
  ), [items, selectedItemIds]);

  return (
    <MenuGroup
      title={() => (
        <View
          style={styles.menuGroupTitleContainer}
        >
          <Text
            category="s2"
          >
            {title}
          </Text>
          <Text
            category="s2"
            appearance="hint"
            numberOfLines={1}
          >
            {truncate(selectedItemsLabel, 30)}
          </Text>
        </View>
      )}
    >
      {
        items.map((item, index) => (
          <MenuItem
            key={item.id}
            style={styles.menuItem}
            accessoryLeft={() => (
              <CheckBox
                key={item.id}
                style={styles.checkbox}
                checked={selectedItemIds.includes(item.id)}
                onChange={(checked) => onChange(item, checked)}
              >
                {item.label}
              </CheckBox>
            )}
          />
        ))
      }
    </MenuGroup> 
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: 10,
  },
  menuItem: {
    height: 38,
  },
  checkbox: {
    height: 38
  },
  menuGroupTitleContainer: {
    justifyContent: "space-between",
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
  }
})


export default React.memo(CheckBoxMenuGroup);
