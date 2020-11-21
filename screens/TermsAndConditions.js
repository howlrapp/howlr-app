import React, { useMemo } from 'react';
import { orderBy } from 'lodash';

import InfoScreen from './InfoScreen';

import useApp from '../hooks/useApp';

const TermsAndConditions = () => {
  const { tosItems } = useApp();

  const data = useMemo(() => (
    orderBy(tosItems, 'order')
  ), [tosItems])

  return (
    <InfoScreen data={data} title="Terms of use" />
  );
}

export default React.memo(TermsAndConditions);
