import React, { useMemo } from 'react';
import { trim } from 'lodash';
import { format } from 'date-fns';

import InfoScreen from './InfoScreen';

import useApp from '../hooks/useApp';

const Changelog = () => {
  const { changelogs } = useApp();

  const data = useMemo(() => (
    changelogs.map(({ body, createdAt }) => ({
      body: trim(body),
      title: format(new Date(createdAt), "MMM. do yyyy")
    }))
  ), [changelogs])

  return (
    <InfoScreen data={data} title="Changelog" />
  );
}

export default React.memo(Changelog);
