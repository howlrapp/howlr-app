import React, { useMemo } from 'react';

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';

const ChatSummary = ({
  chat
}) => {
  const { matchKinds } = useApp();
  const { id: viewerId } = useViewer();

  const chatMatchKind = useMemo(() => (
    matchKinds.find((matchKind) => matchKind.id === chat.matchKindId)
  ), [matchKinds, chat]);

  if (chatMatchKind) {
    if (chat.senderId === viewerId) {
      return (`You want to ${chatMatchKind.label.toLowerCase()}`)
    }
    return (`${chat.contact.name} wants to ${chatMatchKind.label.toLowerCase()}`)
  }
}

export default React.memo(ChatSummary);
