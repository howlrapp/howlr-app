import React from 'react';

import MenuItemViewerFormSingleChoice from '../MenuItemViewerFormSingleChoice';

const OPTIONS = [
  { value: "kilometers", label: "Kilometers" },
  { value: "miles",      label: "Miles"      },
];

const DistanceUnitForm = (props) => {
  return (
    <MenuItemViewerFormSingleChoice
      title="Unit of distance"
      options={OPTIONS}
      attribute="distanceUnit"
      description="If we ever go to another star we will add light-years here."
      {...props}
    />
  );
}

export default React.memo(DistanceUnitForm);
