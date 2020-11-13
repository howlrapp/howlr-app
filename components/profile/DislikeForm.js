import React from 'react';

import MenuItemViewerFormInput from '../MenuItemViewerFormInput';

import useApp from '../../hooks/useApp';

const DislikeForm = () => {
  const { maximumFieldsLength } = useApp();

  return (
    <MenuItemViewerFormInput
      title="Dislike"
      attribute="dislike"
      noneLabel="Nothing"
      description="Tell others what you're not into and whatever you don't like, but don't be mean!"
      inputProps={{
        multiline: true,
        numberOfLines: 3,
        maxLength: maximumFieldsLength,
        minHeight: 120,
        maxHeight: 170,
        textAlignVertical: 'top',
      }}
    />
  );
}

export default React.memo(DislikeForm);
