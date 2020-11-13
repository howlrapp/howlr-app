import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';

import MenuItemViewerFormMultipleChoice from '../MenuItemViewerFormMultipleChoice';

const GenderForm = (props) => {
  const { genders } = useApp();

  const options = useMemo(() => (
    genders.map(({ id, label }) => ({ value: id, label }))
  ), [genders]);

  return (
    <MenuItemViewerFormMultipleChoice
      title="Genders"
      options={options}
      attribute="genderIds"
      description="We know some of you will pick them all, but even after three years that's still not funny."
      {...props}
    />
  );
}

export default React.memo(GenderForm);
