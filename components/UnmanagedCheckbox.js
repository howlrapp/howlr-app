import React, { useState, useCallback } from 'react';
import { CheckBox,  Text, useTheme } from '@ui-kitten/components';

const UnmanagedCheckbox = ({ onChange, id, defaultChecked = false, ...props }) => {
  const [ checked, setChecked ] = useState(defaultChecked);

  const handleChange = useCallback(() => {
    setChecked(checked => !checked);
    if (onChange) {
      onChange(id, !checked)
    }
  }, [id, checked]);

  return (
    <CheckBox
      {...props}
      checked={checked}
      onChange={handleChange}
    />
  )
}

export default React.memo(UnmanagedCheckbox);
