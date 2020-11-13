import React, { useCallback } from 'react';

import useViewer from '../../hooks/useViewer';
import { GET_VIEWER } from '../../hooks/useGetViewer';
import useUpdateViewer from '../../hooks/useUpdateViewer';

import MenuItemViewerFormLocation from '../MenuItemViewerFormLocation';

const LocationForm = (props) => {
  const { latitude, longitude, localities } = useViewer();
  const [ updateViewer, { loading }] = useUpdateViewer();

  const handleSave = useCallback(({ latitude: newLatitude, longitude: newLongitude }) => {
    if (latitude === newLatitude && longitude === newLongitude) {
      return;
    }

    return (
      updateViewer({
        variables: {
          input: {
            latitude: newLatitude,
            longitude: newLongitude
          }
        },
        awaitRefetchQueries: true,
        refetchQueries: [{ query: GET_VIEWER }]
      })
    );
  }, [latitude, longitude]);

  return (
    <MenuItemViewerFormLocation
      title="Location"
      attribute="location"
      initialValue={{
        latitude,
        longitude,
      }}
      localities={localities}
      onSave={handleSave}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(LocationForm);
