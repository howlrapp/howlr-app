import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from '@ui-kitten/components';

import MenuItemForm from './MenuItemForm';

const MenuItemFormMultipleChoice = ({
  initialValue,
  onSave,
  noneLabel = "None",
  options = [],
  ...props
}) => {
  const [ value, setValue ] = useState(initialValue);
  useEffect(() => setValue(initialValue), [setValue, initialValue]);

  const initialSelectedOptions = useMemo(() => (
    options.filter(({ value }) => initialValue.includes(value))
  ), [options, initialValue]);

  const hint = useMemo(() => {
    const labels = initialSelectedOptions.map(({ label }) => label);

    if (labels.length === 0) {
      return noneLabel;
    }
    return labels.join(", ");
  }, [initialSelectedOptions]);

  const handleChange = useCallback((optionValue, checked) => {
    if (checked) {
      setValue((value) => [ ...value, optionValue ]);
    } else {
      setValue((value) => value.filter((someValue) => someValue !== optionValue));
    }
  }, [setValue, value]);

  const handleSave = useCallback(() => (
    onSave(value)
  ), [onSave, value]);

  const handleCancel = useCallback(() => (
    handleChange(initialValue)
  ), [handleChange, initialValue]);

  return (
    <MenuItemForm
      hint={hint}
      onSave={handleSave}
      onCancel={handleCancel}
      {...props}
    >
      {
        options.map((item) => (
          <CheckBox
            key={item.value}
            style={styles.checkbox}
            checked={value.includes(item.value)}
            onChange={(checked) => handleChange(item.value, checked)}
          >
            {item.label}
          </CheckBox>
        ))
      }
    </MenuItemForm>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginVertical: 9,
  },
})

export default React.memo(MenuItemFormMultipleChoice);
