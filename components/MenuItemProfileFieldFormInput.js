import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Toggle } from '@ui-kitten/components';
import { isEmpty } from 'lodash';

import MenuItemFormInput from './MenuItemFormInput';

import useViewer from '../hooks/useViewer';
import useSetProfileFieldValue from '../hooks/useSetProfileFieldValue';

const MenuItemProfileFieldFormInput = ({
  profileField,
  inputProps,
  ...props
}) => {
  const { profileFieldValues } = useViewer();
  const [ setProfileFieldValue, { loading } ] = useSetProfileFieldValue();

  const profileFieldValue = useMemo(() => (
    profileFieldValues.find(({ name }) => name === profileField.name)
  ), [profileField, profileFieldValues]);

  const [ restricted, setRestricted ] = useState(profileFieldValue.restricted);

  const handleSave = useCallback((value) => (
    setProfileFieldValue({
      variables: {
        input: {
          name: profileFieldValue.name,
          value,
          restricted
        }
      }
    })
  ), [setProfileFieldValue, restricted]);

  const inputPropsWithPlaceholder = useMemo(() => {
    if (!isEmpty(profileField.pattern) && !isEmpty(profileField.regexp)) {
      const regexp = new RegExp(profileField.regexp);
      const usernamePlaceholder = profileField.pattern.match(regexp)[1];
      const urlParts = profileField.pattern.split(usernamePlaceholder).filter((part) => part.length);

      return ({
        ...inputProps,
        accessoryLeft: () => <Text>{urlParts[0]}</Text>,
        accessoryRight: () => <Text>{urlParts[1]}</Text>,
        placeholder: usernamePlaceholder,
        textStyle: {
          marginLeft: 0
        },
        autoCorrect: false,
        autoCapitalize: 'none',
      });
    }
    return ({ ...inputProps, autoCorrect: false })
  }, [profileField]);

  return (
    <MenuItemFormInput
      title={profileField.label}
      description={profileField.description}
      initialValue={profileFieldValue.value}
      onSave={handleSave}
      inputProps={inputPropsWithPlaceholder}
      loading={loading}
      {...props}
    >
      <Toggle
        checked={restricted}
        onChange={(restricted) => setRestricted(restricted)}
        style={styles.visibilitySelector}
      >
        Restrict visibility to people you liked
      </Toggle>
    </MenuItemFormInput>
  );
}

const styles = StyleSheet.create({
  visibilitySelector: {
    marginTop: 20
  }
})

export default React.memo(MenuItemProfileFieldFormInput);
