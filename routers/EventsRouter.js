import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tab, TabBar, Text } from '@ui-kitten/components';

import useViewer from '../hooks/useViewer';

import HomeTopNavigation from '../components/HomeTopNavigation';
import ResponsiveLayout from '../components/ResponsiveLayout';
import AllEvents from '../screens/AllEvents';
import MyEvents from '../screens/MyEvents';

const TopTabBar = ({ navigation, state }) => {
  const { eventsAsParticipant } = useViewer();
  const myEventsdisabled = eventsAsParticipant.length === 0;

  useEffect(() => {
    if (myEventsdisabled && state.routeNames[state.index] === "MyEvents") {
      navigation.navigate("AllEvents");
    }
  }, [myEventsdisabled]);

  return (
    <>
      <HomeTopNavigation title="Events" />
      <ResponsiveLayout grow={false} background="background-basic-color-1">
        <TabBar
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}
         >
          <Tab title='All events' />
          <Tab
            title={({ style, ...props }) => (
              <Text style={[ style, { opacity: myEventsdisabled ? 0.3 : 1 } ]} {...props}>Going</Text>
            )}
            disabled={myEventsdisabled}
          />
        </TabBar>
      </ResponsiveLayout>
    </>
  );
};

const Navigator = createMaterialTopTabNavigator();

const EventsRouter = () => {
  const { eventsAsParticipant } = useViewer();
  const myEventsdisabled = eventsAsParticipant.length === 0;

  return (
    <Navigator.Navigator tabBar={props => <TopTabBar {...props} />}>
      <Navigator.Screen name="AllEvents" component={AllEvents} />
      {!myEventsdisabled && <Navigator.Screen name="MyEvents" component={MyEvents} />}
    </Navigator.Navigator>
  );
}

export default React.memo(EventsRouter);
