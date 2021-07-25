import React, { useMemo } from 'react';
import { useTheme } from '@ui-kitten/components';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import useSentLikesUserIds from '../hooks/useSentLikesUserIds';
import useReceivedLikesUserIds from '../hooks/useReceivedLikesUserIds';

const contributorIconPicture = require('../assets/badges/contributor.png');
const halfLikeIconPicture = require('../assets/badges/half-like.png');
const likeIconPicture = require('../assets/badges/like.png');
const placeHolderImage = require('../assets/default-avatar.png');

const Indicator = React.memo(({
  children,
  radius,
  angle,
  size,
  borderSize = 2,
  style,
  indicatorsBackground
}) => {
  const theme = useTheme();

  const computePositionY = (angle) => (
    Math.sin(angle * (Math.PI / 180)) * radius + radius
  );

  const computePositionX = (angle) => (
    Math.cos(angle * (Math.PI / 180)) * radius + radius
  );

  const positionStyle = useMemo(() => ({
    top: computePositionY(angle) - (size + borderSize * 2) / 2,
    left: computePositionX(angle) - (size + borderSize * 2) / 2
  }), [radius, angle]);

  return (
    <View
      style={[
        styles.indicator,
        positionStyle,
        {
          position: 'absolute',
          height: size + borderSize * 2,
          width: size + borderSize * 2,
          borderRadius: size,
          backgroundColor: theme[indicatorsBackground],
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        },
        style
      ]}
    >
      {children}
    </View>
  );
})

const UserAvatar = ({
  user,
  size,
  indicatorsSize = 10,

  indicators = [],

  onlineIndicatorAngle = 50,
  contributorIconAngle = 230,
  likeIconAngle = 130,

  indicatorsBackground  = 'background-basic-color-1',

  containerStyle = {},

  onPress,

  avatarProperty = "avatarUrl",

  ...props
}) => {
  const theme = useTheme();

  const source = useMemo(() => {
    if (Number.isInteger(user[avatarProperty])) {
      return (user[avatarProperty])
    }

    return (
      user[avatarProperty] ? { uri: user[avatarProperty] } : placeHolderImage
    );
  }, [user]);

  const sentLikesUserIds = useSentLikesUserIds();
  const receivedLikesUserIds = useReceivedLikesUserIds();

  const likedByMe = useMemo(() => (
    !!sentLikesUserIds[user.id]
  ), [user, sentLikesUserIds]);

  const likedByThem = useMemo(() => (
    !!receivedLikesUserIds[user.id]
  ), [user, receivedLikesUserIds]);

  // I found that using defaultSource slowed down the app
  // during scrolling, at least in development so I use something instead
  return (
    <View
      style={[ { width: size, height: size }, containerStyle ]}
    >
      <View
        style={[
          { width: size, height: size },
          styles.placeholderStyle,
          { borderRadius: size, backgroundColor: theme['background-basic-color-4'] }
        ]}
      />
      <TouchableOpacity
        disabled={!onPress}
        onPress={onPress}
      >
        <FastImage
          style={{ width: size, height: size, borderRadius: size }}
          source={source}
          {...props}
        />
      </TouchableOpacity>
      {
        (user.online && indicators.includes("online")) && (
          <Indicator
            radius={size / 2}
            angle={onlineIndicatorAngle}
            size={indicatorsSize}
            indicatorsBackground={indicatorsBackground}
          >
            <View
              style={[
                {
                  width: indicatorsSize,
                  height: indicatorsSize,
                  borderRadius: indicatorsSize / 2,
                  backgroundColor: theme['color-success-700'],
                }
              ]}
            />
          </Indicator>
        )
      }
      {
        (user.badge && indicators.includes("contributor")) && (
          <Indicator
            radius={size / 2}
            angle={contributorIconAngle}
            size={indicatorsSize}
            indicatorsBackground={indicatorsBackground}
          >
            <Image
              source={contributorIconPicture}
              style={{
                width: indicatorsSize,
                height: indicatorsSize
              }}
            />
          </Indicator>
        )
      }
      {
        (likedByThem && !likedByMe && indicators.includes("like")) && (
          <Indicator
            radius={size / 2}
            angle={likeIconAngle}
            size={indicatorsSize}
            indicatorsBackground={indicatorsBackground}
          >
            <Image
              source={halfLikeIconPicture}
              style={{
                width: indicatorsSize,
                height: indicatorsSize
              }}
            />
          </Indicator>
        )
      }
      {
        (likedByMe && indicators.includes("like")) && (
          <Indicator
            radius={size / 2}
            angle={likeIconAngle}
            size={indicatorsSize}
            indicatorsBackground={indicatorsBackground}
          >
            <Image
              source={likeIconPicture}
              style={{
                width: indicatorsSize,
                height: indicatorsSize
              }}
            />
          </Indicator>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
  },
  placeholderStyle: {
    position: 'absolute'
  }
})

export default React.memo(UserAvatar);
