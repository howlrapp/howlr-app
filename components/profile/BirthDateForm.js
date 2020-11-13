import React from 'react';

import MenuItemViewerFormDatePicker from '../MenuItemViewerFormDatePicker';

const BirthDateForm = () => {
  return (
    <MenuItemViewerFormDatePicker
      title="Birthdate"
      attribute="birthdate"
      description="Your birthdate will not be shared with others, we only use it to compute your age thanks to our enormous computing power."
    />
  );
}

export default React.memo(BirthDateForm);
