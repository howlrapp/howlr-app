import React from 'react';

import MenuItemViewerFormInput from '../MenuItemViewerFormInput';

import useApp from '../../hooks/useApp';

const BioForm = () => {
  const { maximumFieldsLength } = useApp();

  return (
    <MenuItemViewerFormInput
      title="Bio"
      attribute="bio"
      description="Tell others more about yourself, your work, your passions, whatever comes to mind. No wrong answers here."
      inputProps={{
        multiline: true,
        numberOfLines: 3,
        maxLength: maximumFieldsLength,
        minHeight: 120,
        maxHeight: 170,
        textAlignVertical: 'top'
      }}
    />
  );
}

export default React.memo(BioForm);
