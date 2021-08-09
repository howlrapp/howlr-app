import React from 'react';

import MenuItemViewerFormSingleChoice from '../MenuItemViewerFormSingleChoice';

const OPTIONS = [
  { value: false,  label: "Yes"  },
  { value: true,   label: "No"   },
];

const HideLikesForm = (props) => {
  return (
    <MenuItemViewerFormSingleChoice
      title="Show Like counters"
      description="Enable this setting to display your received and sent Likes counters in your profile."
      options={OPTIONS}
      attribute="hideLikes"
      {...props}
    />
  );
}

export default React.memo(HideLikesForm);
