import { useEffect } from 'react';

import * as ScreenOrientation from 'expo-screen-orientation';
import * as Device from 'expo-device';

const enforceScreenOrientation = async (policy) => {
  const deviceType = await Device.getDeviceTypeAsync();

  if (deviceType === Device.DeviceType.PHONE && policy === 'locked-on-phone') {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }
}

const useEnforceScreenOrientation = (policy = "locked-on-phone") => {
  useEffect(() => {
    enforceScreenOrientation(policy);
  }, [policy]);
}

export default useEnforceScreenOrientation;
