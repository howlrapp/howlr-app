import React, { useCallback } from 'react';

import MenuItemFormDatePicker from './MenuItemFormDatePicker';

import useViewer from '../hooks/useViewer';
import useUpdateViewer from '../hooks/useUpdateViewer';

const MenuItemViewerFormDatePicker = ({
  title,
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
    <MenuItemFormDatePicker
      title={title}
      initialValue={viewer[attribute]}
      onSave={handleSave}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(MenuItemViewerFormDatePicker);
