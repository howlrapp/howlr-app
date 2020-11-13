import React from 'react';

import MenuItemViewerFormInput from '../MenuItemViewerFormInput';

import useApp from '../../hooks/useApp';

const LikeForm = () => {
  const { maximumFieldsLength } = useApp();

  return (
    <MenuItemViewerFormInput
      title="Like"
      attribute="like"
      noneLabel="Nothing"
      description="Fill this field with love, kindness and whatever comes to your dirty mind."
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

export default React.memo(LikeForm);
