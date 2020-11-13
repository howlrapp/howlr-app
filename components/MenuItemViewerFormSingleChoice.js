import React, { useCallback } from 'react';

import useViewer from '../hooks/useViewer';
import useUpdateViewer from '../hooks/useUpdateViewer';

import MenuItemFormSingleChoice from './MenuItemFormSingleChoice';

const MenuItemViewerFormSingleChoice = ({
  title,
  options,
  attribute,
  ...props
}) => {
  const viewer = useViewer();
  const [ updateViewer, { loading } ] = useUpdateViewer();

  const handleSave = useCallback((value) => (
    updateViewer({
      variables: {
        input: { [attribute]: value }
      }
    })
  ), [updateViewer, attribute]);

  return (
    <MenuItemFormSingleChoice
      title={title}
      options={options}
      initialValue={viewer[attribute]}
      onSave={handleSave}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(MenuItemViewerFormSingleChoice);
