import React from 'react';
import { Text, Button, useTheme } from '@ui-kitten/components';
import { View, StyleSheet, StatusBar } from 'react-native';

const EmptyList = ({
  title = "Nothing here",
  description,
  callToAction,
  onPressCallToAction,
  descriptionMaxWidth = 300,
  children,
  backgroundColor = 'background-basic-color-2',
  full = true,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme[backgroundColor] },
        full ? { minHeight: "100%" } : {}
      ]}
      {...props}
    >
      <View
        style={[ styles.textContainer, { maxWidth: descriptionMaxWidth } ]}
      >
        {
          title && (
            <Text
              category="h6"
              appearance='hint'
              style={styles.text}
            >
              {title}
            </Text>
          )
        }
        {
          description && (
            <Text
              category="p2"
              appearance='hint'
              style={styles.text}
            >
              {description}
            </Text>
          )
        }
      </View>
      {
        children
      }
      {
        callToAction && (
          <Button
            status="info"
            appearance="outline"
            style={styles.callToAction}
            onPress={onPressCallToAction}
          >
            {callToAction}
          </Button>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10
  },
  callToAction: {
    marginTop: '10%',
  }
})

export default React.memo(EmptyList);
