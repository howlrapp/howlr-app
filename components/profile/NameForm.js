import React from 'react';

import MenuItemViewerFormInput from '../MenuItemViewerFormInput';

import useApp from '../../hooks/useApp';

const NameForm = () => {
  const { maximumNameLength } = useApp();

  return (
    <MenuItemViewerFormInput
      title="Name"
      attribute="name"
      description="Pick any name you fancy, just don't make it rude."
      required
      inputProps={{
        autoCompleteType: 'username',
        maxLength: maximumNameLength,
      }}
    />
  );
}


export default React.memo(NameForm);
