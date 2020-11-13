import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';

import MenuItemViewerFormMultipleChoice from '../MenuItemViewerFormMultipleChoice';

const EnabledMatchKindsForm = (props) => {
  const { matchKinds } = useApp();

  const options = useMemo(() => (
    matchKinds.map(({ id, label }) => ({ value: id, label }))
  ), [matchKinds]);

  return (
    <MenuItemViewerFormMultipleChoice
      title="Looking for"
      description="Let others know what you're up to. Messages will be disabled if you uncheck every options."
      options={options}
      attribute="matchKindIds"
      noneLabel="Nothing"
      {...props}
    />
  );
}

export default React.memo(EnabledMatchKindsForm);
