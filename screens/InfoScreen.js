import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Divider, Text } from '@ui-kitten/components';
import { isEmpty, trim } from 'lodash';
import Markdown from 'react-native-markdown-display';

import ScreenTopNavigation from '../components/ScreenTopNavigation';
import MenuSeparator from '../components/MenuSeparator';
import ResponsiveLayout from '../components/ResponsiveLayout';

const renderItem = ({ item: { title, body } }) => {
  return (
    <ListItem
      title={trim(isEmpty(title) ? body : title)}
      description={({ style, ...props }) => {
        if (isEmpty(title) || isEmpty(body)) {
          return (null);
        }

        return (
          <Markdown style={{ body: [style, styles.subtitle] }}>{body}</Markdown>
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
    marginTop: 5,
  }
});

export default React.memo(InfoScreen);
