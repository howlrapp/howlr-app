import React, { useMemo } from 'react';
import { orderBy } from 'lodash';

import InfoScreen from './InfoScreen';

import useApp from '../hooks/useApp';

const Faq = () => {
  const { faqItems } = useApp();

  const data = useMemo(() => (
    orderBy(faqItems, 'order')
  ), [faqItems])

  return (
    <InfoScreen data={data} title="Frequently asked questions" />
  );
}

export default React.memo(Faq);
