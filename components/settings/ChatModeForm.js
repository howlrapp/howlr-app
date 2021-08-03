import React, { useCallback } from 'react';

import MenuItemFormSingleChoice from '../MenuItemFormSingleChoice';

import useGetChatMode from '../../hooks/useGetChatMode';
import useSetChatMode from '../../hooks/useSetChatMode';

const DATA = [
  { value: "inline",  label: "Inline"         },
  { value: "modal",   label: "Modal"          },
];

const ChatModeForm = (props) => {
  const { data } = useGetChatMode();
  const initialValue = data?.chatMode || "inline";
  const [ setChatMode, { loading } ] = useSetChatMode();

  const handleSave = useCallback((value) => {
    return (
      setChatMode({ variables: { chatMode: value }})
    );
  }, []);

  return (
    <MenuItemFormSingleChoice
      title="Chat mode"
      options={DATA}
      description="Use the Modal mode if you're having trouble with the virtual keyboard."
      initialValue={initialValue}
      onSave={handleSave}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(ChatModeForm);
