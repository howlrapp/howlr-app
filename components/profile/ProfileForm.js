import React from 'react';

import { Menu, Divider } from '@ui-kitten/components';

import NameForm from './NameForm';
import BioForm from './BioForm';

import LocationForm from './LocationForm';

import LikeForm from './LikeForm';
import DislikeForm from './DislikeForm';
import EnabledMatchKindsForm from './EnabledMatchKindsForm';

import BirthDateForm from './BirthDateForm';
import HideAgeForm from './HideAgeForm';

import GenderForm from './GenderForm';
import SexualOrientationForm from './SexualOrientationForm';
import RelationshipStatusForm from './RelationshipStatusForm';

import MenuSeparator from '../MenuSeparator';
import ResponsiveLayout from '../ResponsiveLayout';
import MenuSection from '../MenuSection';

const ProfileForm = ({ route: { params }}) => {
  return (
    <>
      <Menu
        contentInsetAdjustmentBehavior="automatic"
      >
        <ResponsiveLayout>
          <MenuSeparator />

          <MenuSection>
            <NameForm />
            <Divider />
            <BioForm />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <LocationForm initialOpen={params?.openChangeLocation} />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <LikeForm />
            <Divider />
            <DislikeForm />
            <Divider />
            <EnabledMatchKindsForm />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <BirthDateForm />
            <Divider />
            <HideAgeForm />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <GenderForm />
            <Divider />
            <SexualOrientationForm />
            <Divider />
            <RelationshipStatusForm />
          </MenuSection>

          <MenuSeparator />

        </ResponsiveLayout>
      </Menu>
    </>
  );
}

export default React.memo(ProfileForm);
