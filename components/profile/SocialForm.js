import React from 'react';
import { View } from 'react-native';
import { Menu, Divider } from '@ui-kitten/components';

import MenuSeparator from '../MenuSeparator';
import MenuSection from '../MenuSection';
import ResponsiveLayout from '../ResponsiveLayout';
import MenuItemProfileFieldFormInput from '../MenuItemProfileFieldFormInput';

import useApp from '../../hooks/useApp';

const SocialForm = () => {
  const { profileFieldGroups } = useApp();

  return (
    <Menu
      contentInsetAdjustmentBehavior="automatic"
    >
      <ResponsiveLayout>
        <MenuSeparator />
        {
          profileFieldGroups.map((profileFieldGroup) => (
            <React.Fragment key={profileFieldGroup.id}>
              <MenuSection>
                {
                  profileFieldGroup.profileFields.map((profileField, index) => (
                    <React.Fragment key={profileField.id}>
                      <MenuItemProfileFieldFormInput
                        profileField={profileField}
                      />
                      {(index < profileFieldGroup.profileFields.length - 1) ? <Divider /> : <View />}
                    </React.Fragment>
                  ))
                }
              </MenuSection>
              <MenuSeparator />
            </React.Fragment>
          ))
        }
      </ResponsiveLayout>
    </Menu>
  );
}

export default React.memo(SocialForm);
