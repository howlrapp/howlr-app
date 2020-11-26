import React, { useState, useCallback, useRef } from 'react';
import { Input, Text, useTheme } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';
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

  const handleClear = useCallback(() => {
    inputRef.current.clear();
    setValue("");
  }, [inputRef, setValue]);

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}
      >
        {
          !isEmpty(value) && (
            <TouchableOpacity>
              <Text
                category="p2"
                appearance="hint"
                onPress={handleClear}
              >
                Clear
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    </MenuItemForm>
  );
}

export default React.memo(MenuItemFormInput);
