import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tab, TabBar } from '@ui-kitten/components';

import HomeTopNavigation from '../components/HomeTopNavigation';
import ResponsiveLayout from '../components/ResponsiveLayout';
import ReceivedLikes from '../screens/ReceivedLikes';
import SentLikes from '../screens/SentLikes';

const TopTabBar = ({ navigation, state }) => {
  return (
    <>
      <HomeTopNavigation title="Likes" />
      <ResponsiveLayout grow={false} background="background-basic-color-1">
        <TabBar
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}
         >
          <Tab title='Received' />
          <Tab title='Sent' />
        </TabBar>
      </ResponsiveLayout>
    </>
  );
};

const Navigator = createMaterialTopTabNavigator();

const LikesRouter = () => {
  return (
    <Navigator.Navigator tabBar={props => <TopTabBar {...props} />}>
      <Navigator.Screen name="ReceivedLikes" component={ReceivedLikes} />
      <Navigator.Screen name="SentLikes" component={SentLikes} />
    </Navigator.Navigator>
  );
}

export default React.memo(LikesRouter);
