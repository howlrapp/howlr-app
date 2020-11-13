import React, { useCallback, useMemo } from 'react';

import useViewer from '../../hooks/useViewer';
import useUpdateViewer from '../../hooks/useUpdateViewer';

import MenuItemFormSingleChoice from '../MenuItemFormSingleChoice';

const OPTION_VALUES = [
  null,
  50,
  100,
  500,
  1000,
  5000,
  10000,
];

const MaximumDistanceForm = (props) => {
  const viewer = useViewer();
  const [ updateViewer, { loading } ] = useUpdateViewer();

  const handleSave = useCallback((value) => (
    updateViewer({
      variables: {
        input: { maximumSearchableDistance: value * 1000 }
      }
    })
  ), [updateViewer]);

  const computeLabel = useCallback((value) => {
    if (!value) {
      return ("Everywhere");
    }

    if (viewer.distanceUnit === 'miles') {
      return (`${Math.ceil(value * 0.621371)} miles from you`);
    }

    return (`${value} kilometers from you`)
  }, [viewer.distanceUnit]);

  const options = useMemo(() => (
    OPTION_VALUES.map((value) => ({
      value,
      label: computeLabel(value)
    }))
  ), [OPTION_VALUES, computeLabel]);

  const initialValue = useMemo(() => Math.floor(viewer.maximumSearchableDistance / 1000), [viewer.maximumSearchableDistance]);

  return (
    <MenuItemFormSingleChoice
      title="Profile visibility"
      description="Users farther from this limit will not see your profile in searches. Use this setting if you only want local users to reach you."
      options={options}
      initialValue={initialValue}
      onSave={handleSave}
      loading={loading}
      noneLabel="Everywhere"
      {...props}
    />
  );
}

export default React.memo(MaximumDistanceForm);