import React, { useCallback } from 'react';

import MenuItemFormSingleChoice from '../MenuItemFormSingleChoice';

import useGetColorScheme from '../../hooks/useGetColorScheme';
import useSetColorScheme from '../../hooks/useSetColorScheme';

const DATA = [
  { value: "system",  label: "Use system appearance"  },
  { value: "light",   label: "Light theme"            },
  { value: "dark",    label: "Dark theme"             },
];

const ColorSchemeForm = (props) => {
  const { data } = useGetColorScheme();
  const initialValue = data?.colorScheme || "system";
  const [ setColorScheme, { loading } ] = useSetColorScheme();

  const handleSave = useCallback((value) => {
    return (
      setColorScheme({ variables: { colorScheme: value }})
    );
  }, []);

  return (
    <MenuItemFormSingleChoice
      title="Appearance"
      options={DATA}
      description="Watch your eyes!"
      initialValue={initialValue}
      onSave={handleSave}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(ColorSchemeForm);
