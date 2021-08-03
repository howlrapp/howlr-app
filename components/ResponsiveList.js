import React, { useCallback, useMemo } from 'react';
import { List, useTheme } from '@ui-kitten/components';
import * as Device from 'expo-device';
import { RefreshControl } from 'react-native';

import useDeviceType from '../hooks/useDeviceType';

import ResponsiveLayout from './ResponsiveLayout';
import MenuSeparator from './MenuSeparator';

const ResponsiveList = React.forwardRef(({
  contentContainerStyle,
  loading,
  onRefresh,
  ...props
}, ref) => {
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

  const theme = useTheme();

  return (
    <ResponsiveLayout>
      <List
        ref={ref}
        ListHeaderComponent={renderPadding}
        ListFooterComponent={renderPadding}
        contentContainerStyle={flexContentContainerStyle}
        loading={loading}
        onRefresh={onRefresh}
        refreshControl={<RefreshControl refreshing={!!loading} onRefresh={onRefresh} tintColor={theme["text-basic-color"]} />}
        {...props}
      />
    </ResponsiveLayout>
  )
})

export default React.memo(ResponsiveList);
