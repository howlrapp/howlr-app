import React, { useMemo } from 'react';

import InfoScreen from './InfoScreen';

import useApp from '../hooks/useApp';

const TermsAndConditions = () => {
  const { minimumAge, name } = useApp();

  const data = useMemo(() => ([
    {
      text: `You must be ${minimumAge} or older to use ${name}.`,
    },
    {
      text: `You agree to use truthful information and not to impersonate anyone.`,
    },
    {
      text: `You agree not to use any material, text, username, pictures or avatar that are forbidden under French law.`,
    },
    {
      text: "Events you create must have a lawful objective, take place in an authorized area, with the lawful and voluntary consent of every participant.",
    },
    {
      text: `Hate speech, harassment, threats, defamation are forbidden.`,
    },
    {
      text: `Offensive or pornographic materials are forbidden.`,
    },
    {
      text: `Unsolicited advertising is forbidden, advertising is allowed in your profile information as long as it is related to Furry material.`,
    },
    {
      text: `${name} reserves the right to refuse or suspend access to any user, for any reason or no reason, and without any notice.`,
    },
  ]), [minimumAge, name])

  return (
    <InfoScreen data={data} title="Terms of use" />
  );
}

export default React.memo(TermsAndConditions);
