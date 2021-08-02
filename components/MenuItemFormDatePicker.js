import React, { useState, useCallback, useMemo, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isEmpty } from 'lodash';
import { format, subYears } from 'date-fns'
import { Platform } from 'react-native';
import { MenuItem, Text } from '@ui-kitten/components';
import { truncate } from 'lodash';

import MenuItemForm from './MenuItemForm';

const MenuItemFormDatePicker = ({
  initialValue,
  onSave,
  noneLabel = "None",
  title,
  loading,
  ...props
}) => {
  const initialValueWithDefault = useMemo(() => (
    initialValue ? new Date(initialValue) : subYears(new Date(), 25)
  ), [initialValue]);

  const maxBirthDate = useMemo(() => new Date(), []);
  const minBirthDate = useMemo(() => subYears(new Date(), 100), []);

  const [ value, setValue ] = useState(initialValueWithDefault);
  useEffect(() => setValue(initialValueWithDefault), [initialValueWithDefault]);

  const [ pickerOpen, setPickerOpen ] = useState(false)

  const handleCancel = useCallback(() => {
    setValue(initialValueWithDefault);
  });

  const handleOnChange = (e, date) => {
    if (Platform.OS === 'android') {
      setPickerOpen(false);
      if (date) {
        setValue(date)
        onSave(date);
      }
    }
    else {
      setValue(date);
    }
  }

  const handleSave = useCallback(() => {
    onSave(value)
  }, [value]);

  const hint = useMemo(() => (
    isEmpty(initialValue) ? noneLabel : format(new Date(initialValue), "MMMM do, yyyy")
  ), [initialValue, noneLabel]);

  const handleOpenPicker = useCallback(() => (
    setPickerOpen(true)
  ), [setPickerOpen]);

  if (Platform.OS === 'android') {
    return (
      <>
        <MenuItem
          onPress={handleOpenPicker}
          title={title}
          disabled={loading}
          accessoryRight={() => (
            <Text
              appearance="hint"
              category="c1"
              numberOfLines={1}
              ellipsizeMode='head'
            >
              {truncate(hint, { length: 30 })}
            </Text>
          )}
        />
        {
          pickerOpen && (
            <DateTimePicker
              value={value}
              mode={'date'}
              display="default"
              minimumDate={minBirthDate}
              maximumDate={maxBirthDate}
              onChange={handleOnChange}
            />
          )
        }
      </>
    );
  }

  // IOS
  return (
    <MenuItemForm
      hint={hint}
      onCancel={handleCancel}
      onSave={handleSave}
      title={title}
      loading={loading}
      adjustToContentHeight
      {...props}
    >
      <DateTimePicker
        value={value}
        mode={'date'}
        display="default"
        minimumDate={minBirthDate}
        maximumDate={maxBirthDate}
        onChange={handleOnChange}
      />
    </MenuItemForm>
  );
}


export default React.memo(MenuItemFormDatePicker);
