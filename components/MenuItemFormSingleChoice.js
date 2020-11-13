import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Radio, RadioGroup } from '@ui-kitten/components';

import MenuItemForm from './MenuItemForm';

const MenuItemFormSingleChoice = ({
  initialValue,
  options = [],
  onSave,
  noneLabel = "Unknown",
  ...props
}) => {
  const [ value, setValue ] = useState(initialValue);
  useEffect(() => setValue(initialValue), [initialValue]);

  const selectedIndex = useMemo(() => (
    options.findIndex((option) => option.value === value)
  ), [options, value]);

  const initialSelectedIndex = useMemo(() => (
    options.findIndex((option) => option.value === initialValue)
  ), [options, initialValue]);

  const handleChange = useCallback((selectedIndex) => (
    setValue(options[selectedIndex]?.value)
  ), [options]);

  const handleCancel = useCallback(() => (
    handleChange(initialSelectedIndex)
  ), [initialSelectedIndex]);

  const handleSave = useCallback(() => (
    onSave(value)
  ), [value]);

  return (
    <MenuItemForm
      hint={options[initialSelectedIndex]?.label || noneLabel}
      onCancel={handleCancel}
      onSave={handleSave}
      {...props}
    >
      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={handleChange}
      >
        {
          options.map(({ label, value }) => (
            <Radio key={value}>{label}</Radio>
          ))
        }
      </RadioGroup>
    </MenuItemForm>
  );
}

export default React.memo(MenuItemFormSingleChoice);
