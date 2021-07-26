import React, { useMemo } from 'react';
import { Modalize } from 'react-native-modalize';
import { useTheme } from '@ui-kitten/components';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import {
  useResponsiveScreenWidth,
} from "react-native-responsive-dimensions";


import useDeviceType from '../hooks/useDeviceType';

const ResponsiveModalize = React.forwardRef(({ modalStyle, ...props }, ref) => {
  const theme = useTheme();
  const screenWidth = useResponsiveScreenWidth(100);

  const deviceType = useDeviceType();
  const responsiveModalStyle = useMemo(() => {
    if (deviceType === Device.DeviceType.PHONE) {
      return {
        backgroundColor: theme['background-basic-color-1'],
        width: screenWidth,
        ...modalStyle
      }
    }

    return ({
      backgroundColor: theme['background-basic-color-1'],
      width: Math.min(Constants.manifest.extra.tabletModalWidth, screenWidth),
      alignSelf: 'center',
      ...modalStyle
    })
  })

  return (
    <Modalize
      ref={ref}
      modalStyle={responsiveModalStyle}
      {...props}
    />
  )
})

export default React.memo(ResponsiveModalize);
