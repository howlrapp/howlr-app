import React from 'react';
import { connect } from 'react-redux';
import { Text, Spinner, Button, Icon } from 'native-base';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { WebBrowser } from 'expo';
import variables from "../native-base-theme/variables/platform";
import { setSessionToken } from '../action-creators/sessionToken';
import uuid from 'uuid/v4';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: variables.foregroundColor,
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
      color: variables.backgroundColor,
      textAlign: "center",
      paddingLeft: 16,
      paddingRight: 16,
  },
  icon: {
    fontSize: 90,
    color: variables.backgroundColor,
    padding: 30,
  },
  footer: {
    height: 100,
    backgroundColor: variables.foregroundColor,
    paddingLeft: 40,
    paddingRight: 40,
  },
  submit: {
    backgroundColor: 'transparent',
    borderColor: variables.backgroundColor,
    borderWidth: 1,
    elevation: 0,
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null,
    width: '100%',
  },
  submitText: {
    color: variables.backgroundColor,
  },
});

const Outdated = (props) => {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>{`Your version of Howlr is not supported anymore. Please download an updated version on the Google App Store or on the Apple Play Store.`}</Text>
    </View>
  )
}

export default Outdated;
