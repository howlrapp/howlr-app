import React, { useMemo } from 'react';

import InfoScreen from './InfoScreen';

import useApp from '../hooks/useApp';

const PrivacyPolicy = () => {
  const { name } = useApp();

  const data = useMemo(() => ([
    {
      text: `
We only collect information for the purpose of providing our service, including:

The location you set in your profile. Please note that we never share your precise location (i.e. latitude and longitude) to other users.

Your Telegram ID and username, to authenticate you and communicate with you.

A unique device and session identifier to authenticate you and to send you notifications

All the private information you share with other users (e.g., "Likes", chat messages, etc) so we can show them back to you and to your contacts.
      `
    },
    {
      text: `By uploading content on ${name}, you grant us permission to use and alter this content for the sole purpose of providing our service (e.g. to crop and resize images).`,
    },
    {
      text: `We do not share or sell your information to third parties.`,
    },
    {
      text: `Please note that ${name} does not yet support end-to-end encryption of private messages, however all your communications with our servers are encrypted. Messages are also encrypted before storage and only decrypted on demand.`,
    },
    {
      text: `When you delete your account, all your information, including session information, private messages, etc, are deleted immediately from our active database; encrypted backups and archives that may contains information you updated or deleted may be retained for up to 7 days.`,
    },
  ]), [name]);

  return (
    <InfoScreen data={data} title="Privacy policy" />
  );
}

export default React.memo(PrivacyPolicy);
