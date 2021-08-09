import React from 'react';

import MenuItemViewerFormSingleChoice from '../MenuItemViewerFormSingleChoice';

const OPTIONS = [
  { value: true,  label: "Yes"  },
  { value: false, label: "No"   },
];

const HideNotCommonGroupsForm = (props) => {
  return (
    <MenuItemViewerFormSingleChoice
      title="Protect groups"
      description="With this setting enabled, users looking at your profile will only see the groups you both have in common."
      options={OPTIONS}
      attribute="hideNotCommonGroups"
      {...props}
    />
  );
}

export default React.memo(HideNotCommonGroupsForm);
