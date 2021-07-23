import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';

const ProfilePicture = ({
  picture,
  size,
  paddingCorrection,
  ...props
}) => {
  const theme = useTheme();

  // just like UserAvatar we use a difference in background color
  // as an image placeholder for performance reasons
  return (
    <TouchableOpacity
      delayPressIn={50}
      style={{ paddingLeft: paddingCorrection }}
      {...props}
    >
      <View
        style={[
          styles.placeholderStyle,
          { width: size, height: size, backgroundColor: theme['background-basic-color-4'] }
        ]}
      />
      <FastImage
        style={{ width: size, height: size }}
        source={{
          uri: picture.thumbnailUrl,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  placeholderStyle: {
    position: 'absolute'
  }
})

export default React.memo(ProfilePicture);
