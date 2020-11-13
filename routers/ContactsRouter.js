import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tab, TabBar } from '@ui-kitten/components';

import HomeTopNavigation from '../components/HomeTopNavigation';
import ResponsiveLayout from '../components/ResponsiveLayout';

import AcceptedContacts from '../screens/AcceptedContacts';
import WaitingContacts from '../screens/WaitingContacts';

const TopTabBar = ({ navigation, state }) => {
  return (
    <>
      <HomeTopNavigation title="Chats" />
      <ResponsiveLayout grow={false} background="background-basic-color-1">
        <TabBar
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}
         >
          <Tab title='Accepted' />
          <Tab title='Waiting' />
        </TabBar>
      </ResponsiveLayout>
    </>
  );
};

const Navigator = createMaterialTopTabNavigator();

const ContactsRouter = () => {
  return (
    <Navigator.Navigator tabBar={props => <TopTabBar {...props} />}>
      <Navigator.Screen name="AcceptedContacts"  component={AcceptedContacts}  />
      <Navigator.Screen name="WaitingContacts"   component={WaitingContacts}   />
    </Navigator.Navigator>
  );
}

export default React.memo(ContactsRouter);
