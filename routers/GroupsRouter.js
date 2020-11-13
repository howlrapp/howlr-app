import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTopNavigation from '../components/HomeTopNavigation';
import ResponsiveLayout from '../components/ResponsiveLayout';
import Groups from '../screens/Groups';

const Header = () => {
  return (
    <ResponsiveLayout grow={false} background="background-basic-color-1">
      <HomeTopNavigation title="Groups" />
    </ResponsiveLayout>
  );
};

const Navigator = createStackNavigator();

const GroupsRouter = () => {
  return (
    <Navigator.Navigator screenOptions={{ header: Header }}>
      <Navigator.Screen name="Groups" component={Groups} />
    </Navigator.Navigator>
  );
}

export default React.memo(GroupsRouter);
