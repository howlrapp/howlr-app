import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';

import MenuItemViewerFormMultipleChoice from '../MenuItemViewerFormMultipleChoice';

const SexualOrientationForm = (props) => {
  const { sexualOrientations } = useApp();

  const options = useMemo(() => (
    sexualOrientations.map(({ id, label }) => ({ value: id, label }))
  ), [sexualOrientations]);

  return (
    <MenuItemViewerFormMultipleChoice
      title="Sexual orientations"
      options={options}
      description="This one is pretty straightforward."
      attribute="sexualOrientationIds"
      {...props}
    />
  );
}

export default React.memo(SexualOrientationForm);
