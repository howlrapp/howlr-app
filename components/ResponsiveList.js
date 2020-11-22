import React, { useCallback, useMemo } from 'react';
import { List } from '@ui-kitten/components';
import * as Device from 'expo-device';

import useDeviceType from '../hooks/useDeviceType';

import ResponsiveLayout from './ResponsiveLayout';
import MenuSeparator from './MenuSeparator';

const ResponsiveList = React.forwardRef(({ contentContainerStyle, ...props }, ref) => {
  const deviceType = useDeviceType();

  const renderPadding = useCallback(() => {
    if (deviceType === Device.DeviceType.PHONE) {
      return (null)
    }
    return (<MenuSeparator />)
  }, [deviceType]);

  const flexContentContainerStyle = useMemo(() => ({
    flexGrow: 1,
    ...contentContainerStyle
  }), [contentContainerStyle])

  return (
    <ResponsiveLayout>
      <List
        ref={ref}
        ListHeaderComponent={renderPadding}
        ListFooterComponent={renderPadding}
        contentContainerStyle={flexContentContainerStyle}
        {...props}
      />
    </ResponsiveLayout>
  )
})

export default React.memo(ResponsiveList);
