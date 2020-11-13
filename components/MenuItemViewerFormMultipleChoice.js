import React, { useCallback } from 'react';

import useViewer from '../hooks/useViewer';
import useUpdateViewer from '../hooks/useUpdateViewer';

import MenuItemFormMultipleChoice from './MenuItemFormMultipleChoice';

const MenuItemViewerFormMultipleChoice = ({
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
    <MenuItemFormMultipleChoice
      title={title}
      initialValue={viewer[attribute]}
      onSave={handleSave}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(MenuItemViewerFormMultipleChoice);
