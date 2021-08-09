import React from 'react';

import MenuItemViewerFormSingleChoice from '../MenuItemViewerFormSingleChoice';

const OPTIONS = [
  { value: false,  label: "Yes"  },
  { value: true,   label: "No"   },
];

const HideCityForm = (props) => {
  return (
    <MenuItemViewerFormSingleChoice
      title="Show my city/town"
      description="Disable this setting to hide your city or town in your profile for added privacy."
      options={OPTIONS}
      attribute="hideCity"
      {...props}
    />
  );
}

export default React.memo(HideCityForm);
