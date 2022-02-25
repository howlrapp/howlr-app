import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import Constants from 'expo-constants';

import { Text, withStyles, useTheme } from '@ui-kitten/components';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";

import useGetApp from '../hooks/useGetApp';
import { AppContext } from '../hooks/useApp';

import useToken from '../hooks/useToken';

import useCreateActionCableConsumer from '../hooks/useCreateActionCableConsumer';
import { ActionCableConsumerContext } from '../hooks/useActionCableConsumer';

import ActivityIndicator from '../components/ActivityIndicator';
import EmptyList from '../components/EmptyList';
import ProgressBar from '../components/ProgressBar';
import TermsAndConditions from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';

import Login from '../screens/Login';
import AppMain from './AppMain';

const APP_POLL_INTERVAL = 5 * 60 * 1000;

const LoginNavigator = createStackNavigator();

const AppLoader = ({ eva }) => {
  const theme = useTheme();

  const { data: tokenData, loading: tokenLoading } = useToken();

  const navigationTheme = useMemo(() => ({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: eva.style.navigation.background,
    },
  }))

  const {
     data: appData,
     loading: appLoading,
     error: appError,
  } = useGetApp({
    pollInterval: APP_POLL_INTERVAL
  });

  const actionCableConsumer = useCreateActionCableConsumer(tokenData?.token);

  if (tokenLoading || appLoading || appError) {
    return (
      <EmptyList
        title={null}
        backgroundColor='color-basic-800'
      >
        <ProgressBar
          steps={[
            !tokenLoading,
            !appLoading,
            false, false, false, false, false // four next steps
          ]}
        />
      </EmptyList>
    );
  }

  return (
    <ActionCableConsumerContext.Provider value={actionCableConsumer}>
      <AppContext.Provider value={appData.app}>
        <View
          style={{
            flexGrow: 1,
            backgroundColor: theme['background-basic-color-1']
          }}
        >
          <NavigationContainer
            theme={navigationTheme}
          >
            {
              tokenData?.token ? (
                <AppMain />
              ) : (
                <LoginNavigator.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <LoginNavigator.Screen
                    name="Login"
                    component={Login}
                  />
                  <LoginNavigator.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                  />
                  <LoginNavigator.Screen
                    name="TermsAndConditions"
                    component={TermsAndConditions}
                  />
                </LoginNavigator.Navigator>
              )
            }
          </NavigationContainer>
          <FlashMessage
            position="center"
            style={[
              styles.flashMessage,
              {
                backgroundColor: theme['background-basic-color-2'],
                borderWidth: 1,
                borderColor: theme["background-basic-color-3"]
              }
            ]}
            titleStyle={[ styles.flashMessageTitle ]}
            renderCustomContent={({ withLoader, message, hideMessage }) => {
              return (
                <View>
                  {
                    !hideMessage && (
                      <Text
                        category="s1"
                        style={withLoader ? { marginBottom: 20 } : {}}
                      >
                        {message}
                      </Text>
                    )
                  }
                  {
                    withLoader && (
                      <View
                        style={styles.activityIndicator}
                      >
                        <ActivityIndicator />
                      </View>
                    )
                  }
                </View>
              );
            }}
          />
        </View>
      </AppContext.Provider>
    </ActionCableConsumerContext.Provider>
  )
}

const AppLoaderWithStyles = withStyles(AppLoader, (theme) => ({
  navigation: {
    background: theme['background-basic-color-1']
  }
}));

const styles = StyleSheet.create({
  activityIndicator: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  flashMessage: {
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderRadius: 5
  },
  flashMessageTitle: {
    height: 0,
  }
})

export default AppLoaderWithStyles;
