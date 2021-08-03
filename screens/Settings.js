import React from 'react';

import { Menu, Divider } from '@ui-kitten/components';

import ScreenTopNavigation from '../components/ScreenTopNavigation';

import DistanceUnitForm from '../components/settings/DistanceUnitForm';
import NotificationForm from '../components/settings/NotificationForm';
import ColorSchemeForm from '../components/settings/ColorSchemeForm';
import ChatModeForm from '../components/settings/ChatModeForm';

import MaximumDistanceForm from '../components/settings/MaximumDistanceForm';
import HideCityForm from '../components/settings/HideCityForm';
import HideLikesForm from '../components/settings/HideLikesForm';
import ShareOnlineStatusForm from '../components/settings/ShareOnlineStatusForm';
import HideNotCommonGroupsForm from '../components/settings/HideNotCommonGroupsForm';

import BlockedUsersForm from '../components/settings/BlockedUsersForm';
import LogoutLink from '../components/settings/LogoutLink';
import RemoveAccountLink from '../components/settings/RemoveAccountLink';
import DataConservationLink from '../components/settings/DataConservationLink';

import TermsAndConditionsLink from '../components/settings/TermsAndConditionsLink';
import PrivacyPolicyLink from '../components/settings/PrivacyPolicyLink';

import FaqLink from '../components/settings/FaqLink';
import SourceCodeLink from '../components/settings/SourceCodeLink';
import ChangelogLink from '../components/settings/ChangelogLink';
import WebsiteLink from '../components/settings/WebsiteLink';

import MenuSeparator from '../components/MenuSeparator';
import MenuSection from '../components/MenuSection';
import ResponsiveLayout from '../components/ResponsiveLayout';

const Settings = () => {
  return (
    <>
      <ScreenTopNavigation title="Settings" />
      <Divider />
      <Menu
        contentInsetAdjustmentBehavior="automatic"
      >
        <ResponsiveLayout>
          <MenuSeparator />

          <MenuSection>
            <DistanceUnitForm />
            <Divider />
            <NotificationForm />
            <Divider />
            <ColorSchemeForm />
            <Divider />
            <ChatModeForm />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <MaximumDistanceForm />
            <Divider />
            <HideCityForm />
            <Divider />
            <HideLikesForm />
            <Divider />
            <ShareOnlineStatusForm />
            <Divider />
            <HideNotCommonGroupsForm />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <BlockedUsersForm />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <LogoutLink />
            <Divider />
            <RemoveAccountLink />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
          <DataConservationLink />
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <TermsAndConditionsLink />
            <Divider />
            <PrivacyPolicyLink />
          </MenuSection>

          <MenuSeparator />

          <Divider />
          <FaqLink />
          <Divider />
          <ChangelogLink />
          <Divider />
          <SourceCodeLink />
          <Divider />
          <WebsiteLink />
          <Divider />
          <MenuSeparator />
        </ResponsiveLayout>
      </Menu>
    </>
  )
}

export default React.memo(Settings);
