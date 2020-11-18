import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Divider, Text } from '@ui-kitten/components';

import ScreenTopNavigation from '../components/ScreenTopNavigation';
import MenuSeparator from '../components/MenuSeparator';
import ResponsiveLayout from '../components/ResponsiveLayout';

const renderItem = ({ item: { text, description } }) => {
  return (
    <ListItem
      title={text}
      description={({ style, ...props }) => {
        if (!description) {
          return (null);
        }

        return (
          <Text style={[style, styles.subtitle]} {...props}>
            {description}
          </Text>
        )
      }}
    />
  );
}

const InfoScreenHeader = () => (
  <>
    <MenuSeparator />
    <Divider />
  </>

)

const InfoScreenFooter = () => (
  <>
    <Divider />
    <MenuSeparator />
  </>

)

const InfoScreenSeparator = () => (
  <>
    <Divider />
    <MenuSeparator style={styles.separator} />
    <Divider />
  </>
)

const InfoScreen = ({ data, title }) => {
  return (
    <>
      <ScreenTopNavigation title={title} />
      <Divider />
      <ResponsiveLayout>
        <List
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={InfoScreenHeader}
          ListFooterComponent={InfoScreenFooter}
          ItemSeparatorComponent={InfoScreenSeparator}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </ResponsiveLayout>
    </>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 8
  },
  contentContainerStyle: {
    paddingBottom: 74,
  },
  subtitle: {
    marginTop: 10
  }
});

export default React.memo(InfoScreen);
