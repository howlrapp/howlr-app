import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';

import MenuItemViewerFormSingleChoice from '../MenuItemViewerFormSingleChoice';

const GenderForm = (props) => {
  const { relationshipStatuses } = useApp();

  const options = useMemo(() => (
    relationshipStatuses.map(({ id, label }) => ({ value: id, label }))
  ), [relationshipStatuses]);

  return (
    <MenuItemViewerFormSingleChoice
      title="Relationship status"
      options={options}
      description="Sushi is still single and looking by the way."
      attribute="relationshipStatusId"
      {...props}
    />
  );
}

export default React.memo(GenderForm);
