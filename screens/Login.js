import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { Text, Input, Button, Avatar, CheckBox, useTheme } from '@ui-kitten/components';
import { trim } from 'lodash';
import AppLink from 'react-native-app-link';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import useSetToken from '../hooks/useSetToken';
import useGetSessionByCode from '../hooks/useGetSessionByCode';
import { GET_VIEWER } from '../hooks/useGetViewer';
import useApp from '../hooks/useApp';

const CODE_PATTERN = new RegExp(/([0-9A-Z]{6})/i);

const Login = () => {
  const theme = useTheme();

  const [ agreedToTerms, setAgreedToTerms ] = useState(false);
  const [ showDetails, setShowDetails ] = useState(true);

  const { minimumAge, name, codeBotUsername, logo } = useApp();

  const [ setToken ] = useSetToken();

  const [ getSessionByCode, { data, loading: sessionLoading, error: codeError } ] = useGetSessionByCode(null);

  const [ code, setCode ] = useState("");
  const codeInputRef = useRef();

  useEffect(() => {
    if (codeError) {
      codeInputRef.current?.clear();
      setCode("");
    }
  }, [codeError, codeInputRef])

  useEffect(() => {
    if (code.match(CODE_PATTERN)) {
      getSessionByCode({ variables: { code: code.toUpperCase() }});
    }
  }, [code]);

  useEffect(() => {
    if (data?.sessionByCode?.id) {
      setToken({ variables: { token: data.sessionByCode.id }, refetchQueries: [{ query: GET_VIEWER }] });
    }
  }, [data]);

  const handleChangeCode = useCallback((code) => {
    setCode(trim(code.toUpperCase()))
  }, [setCode]);

  const openConversation = useCallback(() => {
    AppLink.maybeOpenURL(
      `tg://resolve?domain=${codeBotUsername}`,
      {
        appName: "Telegram",
        appStoreId: "686449807",
        playStoreId: "org.telegram.messenger"
      }
    )
  }, [codeBotUsername]);

  const navigation = useNavigation();
  const handleGoToTermsOfUse = useCallback(() => {
    navigation.navigate("TermsAndConditions");
  }, [navigation]);

  const handleGoToPrivacyPolicy = useCallback(() => {
    navigation.navigate("PrivacyPolicy");
  }, [navigation]);

  useEffect(() => {
    const hideDetails = () => setShowDetails(false);

    // we use both for both ios and android
    Keyboard.addListener('keyboardDidShow', hideDetails);
    Keyboard.addListener('keyboardWillShow', hideDetails);

    return () => {
      Keyboard.removeListener('keyboardDidShow', hideDetails);
      Keyboard.removeListener('keyboardWillShow', hideDetails);
    }
  }, []);

  useEffect(() => {
    const showDetails = () => setShowDetails(true);

    Keyboard.addListener('keyboardDidHide', showDetails);
    Keyboard.addListener('keyboardWillHide', showDetails);

    return () => {
      Keyboard.removeListener('keyboardDidHide', showDetails);
      Keyboard.removeListener('keyboardWillHide', showDetails);
    }
  }, []);

  return (
    <>
      <StatusBar style={'light'} />
      <View
        style={[
          styles.root,
          { backgroundColor: theme['color-basic-700'] },
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'offset' : 'offset'}
          style={[ styles.bottom, { backgroundColor: theme['color-basic-800'] } ]}
        >
          <View
            style={styles.bottomInside}
          >
            {
              showDetails && (
                <>
                  <View
                    style={styles.welcomeContainer}
                  >
                    <Text
                      category="h5"
                      style={{ color: theme['color-basic-100'] }}
                    >
                      {`Welcome to ${name}!`}
                    </Text>
                    <Avatar
                      size={"giant"}
                      source={{ uri: logo }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={openConversation}
                    disabled={sessionLoading}
                    style={styles.instructionsContainer}
                  >
                    <Text
                      category="p2"
                      style={[ styles.instructions, { color: theme['color-basic-100'] } ]}
                    >
                      {`Start a conversation with our `}
                      <Text
                        category="c2"
                        style={{ color: theme['color-basic-100'] }}
                      >
                        {`@${codeBotUsername}`}
                      </Text>
                      {` on Telegram and write down your code in the box below.`}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={styles.termsContainer}
                  >
                    <CheckBox
                      style={styles.instructionsContainer}
                      onChange={setAgreedToTerms}
                      checked={agreedToTerms}
                    >
                      {
                        ({ style }) => (
                          <Text
                            style={[ style, { color: theme['color-basic-100'] } ]}
                          >
                            I have read and agree to the Terms of use and Privacy policy
                          </Text>
                        )
                      }
                    </CheckBox>
                    <Button
                      size="tiny"
                      appearance="outline"
                      status="basic"
                      style={styles.termsButton}
                      onPress={handleGoToTermsOfUse}
                    >
                      Terms of use
                    </Button>
                    <Button
                      size="tiny"
                      appearance="outline"
                      status="basic"
                      style={styles.termsButton}
                      onPress={handleGoToPrivacyPolicy}
                    >
                      Privacy policy
                    </Button>
                  </View>
                </>
              )
            }
            <Button
              style={styles.botButton}
              onPress={openConversation}
              size="large"
              disabled={!agreedToTerms || sessionLoading}
            >
              START ON TELEGRAM
            </Button>
            <Input
              status={codeError ? 'danger' : 'info'}
              ref={codeInputRef}
              size="large"
              maxLength={6}
              onChangeText={handleChangeCode}
              autoCapitalize={'none'}
              autoComplete={'off'}
              autoCorrect={false}
              textAlign={'center'}
              disabled={!agreedToTerms || sessionLoading}
              placeholder={codeError ? "WRONG CODE" : "ENTER YOUR 6 DIGITS CODE"}
              keyboardType="visible-password"
            />
            <Text
              category="p2"
              style={[ styles.ageLimit, { color: theme['color-basic-100'] } ]}
            >
              {`You must be ${minimumAge} or older to sign up.`}
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  bottomInside: { // that's mostly how I feel
    minWidth: 340,
    maxWidth: 420,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  instructionsContainer: {
    paddingBottom: 20,
    marginTop: 20,
  },
  instructions: {
    textAlign: 'justify',
    fontSize: 14,
  },
  ageLimit: {
    marginTop: 10,
    textAlign: 'center',
  },
  botButton: {
    marginBottom: 10
  },
  image: {
    marginTop: 20
  },
  termsButton: {
    marginBottom: 10,
  },
  termsContainer: {
    marginBottom: 20,
  }
});

export default React.memo(Login);
