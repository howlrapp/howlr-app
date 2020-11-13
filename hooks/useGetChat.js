import { useQuery, gql } from '@apollo/client';

import { MESSAGE_FRAGMENT } from './useAddMessage';

export const CHAT_FRAGMENT = gql`
  fragment ChatFragment on Chat {
    id
    unread
    recipientId
    senderId
    matchKindId
    acceptedAt
    updatedAt
    previewMessage {
      id
      body
      pictureUrl
      senderId
    }
    contact {
      id
      name
      avatarUrl
      system
      online
    }
  }
`;

export const CHAT_FRAGMENT_WITH_MESSAGES = gql`
  fragment ChatFragmentWithMessages on Chat {
    ...ChatFragment
    messages {
      ...MessageFragment
    }
  }
${MESSAGE_FRAGMENT}
${CHAT_FRAGMENT}`;


export const GET_CHAT = gql`
  query getChat($id: ID!) {
    viewer {
      id
      chat(id: $id) {
        ...ChatFragmentWithMessages
      }
    }
  }
${CHAT_FRAGMENT_WITH_MESSAGES}
`;

export default (options) => {
  return (
    useQuery(GET_CHAT, options)
  );
}
