import React, { useCallback, useMemo } from 'react';

import useViewer from '../../hooks/useViewer';
import useUpdateViewer from '../../hooks/useUpdateViewer';
import { computeDistance } from '../../hooks/useDistance';

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
        input: { maximumSearchableDistance: value ? value * 1000 : null }
      }
    })
  ), [updateViewer]);

  const computeLabel = useCallback((value) => {
    if (!value) {
      return ("Everywhere");
    }

    const computedDistance = computeDistance(value, viewer.distanceUnit);

    if (viewer.distanceUnit === 'miles') {
      return (`${computedDistance} miles from you`);
    }

    return (`${computedDistance} kilometers from you`)
  }, [viewer.distanceUnit]);

  const options = useMemo(() => (
    OPTION_VALUES.map((value) => ({
      value,
      label: computeLabel(value)
    }))
  ), [OPTION_VALUES, computeLabel]);


  const initialValue = useMemo(() => {
    if (viewer.maximumSearchableDistance) {
      return (
        Math.floor(viewer.maximumSearchableDistance / 1000)
      )
    }
    return null;
  }, [viewer.maximumSearchableDistance]);

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