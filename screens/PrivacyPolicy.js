import React, { useMemo } from 'react';
import { orderBy } from 'lodash';

import InfoScreen from './InfoScreen';

import useApp from '../hooks/useApp';

const PrivacyPolicy = () => {
  const { privacyPolicyItems } = useApp();

  const data = useMemo(() => (
    orderBy(privacyPolicyItems, 'order')
  ), [privacyPolicyItems])

  return (
    <InfoScreen data={data} title="Privacy policy" />
  );
}

export default React.memo(PrivacyPolicy);
