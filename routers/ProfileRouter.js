import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import { Tab, TabBar } from '@ui-kitten/components';

import useViewer from '../hooks/useViewer';

import ScreenTopNavigation from '../components/ScreenTopNavigation';

import ProfileForm from '../components/profile/ProfileForm';
import SocialForm from '../components/profile/SocialForm';
import ProfilePictures from '../components/profile/ProfilePictures';
import AvatarUploader from '../components/profile/AvatarUploader';
import ResponsiveLayout from '../components/ResponsiveLayout';

const TopTabBar = ({ navigation, state }) => {
  const viewer = useViewer();

  return (
    <>
      <ScreenTopNavigation title="Profile" />
      <View
        style={styles.basicInformationContainer}
      >
        <AvatarUploader size={92} user={viewer} />
      </View>
      <ResponsiveLayout grow={false} background="background-basic-color-1">
        <TabBar
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}
         >
          <Tab title='About me' />
          <Tab title='Social' />
          <Tab title='Pictures' />
        </TabBar>
      </ResponsiveLayout>
    </>
  );
};

const Navigator = createMaterialTopTabNavigator();

const ProfileRouter = () => {
  return (
    <Navigator.Navigator tabBar={props => <TopTabBar {...props} />}>
      <Navigator.Screen name="ProfileForm"     component={ProfileForm} />
      <Navigator.Screen name="SocialForm"      component={SocialForm}  />
      <Navigator.Screen name="ProfilePictures" component={ProfilePictures}   />
    </Navigator.Navigator>
  );
}

const styles = StyleSheet.create({
  basicInformationContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'center'
  }
})

export default React.memo(ProfileRouter);
