import React from 'react';

import { View } from 'react-native';
import { Menu, Divider } from '@ui-kitten/components';

import { compact } from 'lodash';

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

import SessionsLink from '../components/settings/SessionsLink';
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

import useApp from '../hooks/useApp';

const Settings = () => {
  const {
    githubLink,
    websiteLink,
    changelogs,
    faqItems
  } = useApp();

  const settingsItem = [
    [
      DistanceUnitForm,
      NotificationForm,
      ColorSchemeForm,
      ChatModeForm
    ],
    [
      MaximumDistanceForm,
      HideCityForm,
      HideLikesForm,
      ShareOnlineStatusForm,
      HideNotCommonGroupsForm
    ],
    [
      BlockedUsersForm
    ],
    [
      LogoutLink,
      RemoveAccountLink
    ],
    [
      SessionsLink,
      DataConservationLink
    ],
    [
      TermsAndConditionsLink,
      PrivacyPolicyLink
    ],
    [
      faqItems.length > 0 && FaqLink,
      changelogs.length > 0 && ChangelogLink,
      githubLink && SourceCodeLink,
      websiteLink && WebsiteLink
    ]
  ].map((section) => compact(section));

  return (
    <>
      <ScreenTopNavigation title="Settings" />
      <Divider />
      <Menu
        contentInsetAdjustmentBehavior="automatic"
      >
        <ResponsiveLayout>
          <MenuSeparator />
          {
            settingsItem.map((section, index) => (
              section.length > 0 ? (
                <React.Fragment key={index}>
                  <MenuSection>
                    {
                      section.map((item, index) => (
                        <React.Fragment key={index}>
                          {React.createElement(item)}
                          {index < section.length - 1 ? <Divider /> : <View />}
                        </React.Fragment>
                      ))
                    }
                  </MenuSection>
                  <MenuSeparator />
                </React.Fragment>
              ) : (
                <View />
              )
            ))
          }
        </ResponsiveLayout>
      </Menu>
    </>
  )
}

export default React.memo(Settings);
