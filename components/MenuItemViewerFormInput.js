import React, { useCallback } from 'react';

import MenuItemFormInput from './MenuItemFormInput';

import useViewer from '../hooks/useViewer';
import useUpdateViewer from '../hooks/useUpdateViewer';

const MenuItemViewerFormInput = ({
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
    <MenuItemFormInput
      initialValue={viewer[attribute]}
      onSave={handleSave}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(MenuItemViewerFormInput);
