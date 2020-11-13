import React, { useState, useCallback, useRef } from 'react';
import { Input, useTheme } from '@ui-kitten/components';
import { isEmpty } from 'lodash';

import MenuItemForm from './MenuItemForm';

const MenuItemFormInput = ({
  initialValue,
  inputProps,
  onSave,
  noneLabel = "None",
  required,
  ...props
}) => {
  const theme = useTheme();

  const [ value, setValue ] = useState(initialValue);
  const inputRef = useRef(null);

  const handleCancel = useCallback(() => {
    setValue(initialValue);
  }, [setValue, initialValue]);

  const handleSave = useCallback(() => (
    onSave(value)
  ), [onSave, value]);

  return (
    <MenuItemForm
      hint={isEmpty(initialValue) ? noneLabel : initialValue}
      onClose={handleCancel}
      onSave={handleSave}
      invalid={required && isEmpty(value)}
      {...props}
    >
      <Input
        defaultValue={initialValue}
        onChangeText={setValue}
        ref={inputRef}
        style={{
          backgroundColor: theme['background-basic-color-2']
        }}
        {...inputProps}
      />
    </MenuItemForm>
  );
}

export default React.memo(MenuItemFormInput);
