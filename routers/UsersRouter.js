import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Users from '../screens/Users';

const Stack = createStackNavigator();

const UsersRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Users"  component={Users} />
    </Stack.Navigator>
  );
}

export default React.memo(UsersRouter);
