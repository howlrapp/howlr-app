import React from 'react';

import MenuItemViewerFormSingleChoice from '../MenuItemViewerFormSingleChoice';

const OPTIONS = [
  { value: false,  label: "Yes"  },
  { value: true,   label: "No"   },
];

const HideAgeForm = (props) => {
  return (
    <MenuItemViewerFormSingleChoice
      title="Display your age"
      description="Too shy to show your age in your profile? This option is for you."
      options={OPTIONS}
      attribute="hideBirthdate"
      {...props}
    />
  );
}

export default React.memo(HideAgeForm);
