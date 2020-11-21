import React, { useMemo } from 'react';
import { Modalize } from 'react-native-modalize';
import { useTheme } from '@ui-kitten/components';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import useDeviceType from '../hooks/useDeviceType';

const ResponsiveModalize = React.forwardRef(({ modalStyle, ...props }, ref) => {
  const theme = useTheme();

  const deviceType = useDeviceType();
  const responsiveModalStyle = useMemo(() => {
    if (deviceType === Device.DeviceType.PHONE) {
      return {
        backgroundColor: theme['background-basic-color-1'],
        ...modalStyle
      }
    }

    return ({
      backgroundColor: theme['background-basic-color-1'],
      width: Constants.manifest.extra.tabletModalWidth,
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
