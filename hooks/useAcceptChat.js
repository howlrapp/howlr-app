import { useMutation, gql } from '@apollo/client';

import { CHAT_FRAGMENT } from './useGetChat';

export const ACCEPT_CHAT = gql`
  mutation acceptChat($input: AcceptChatInput!) {
    acceptChat(input: $input) {
      chat {
        ...ChatFragment
      }
    }
  }
${CHAT_FRAGMENT}
`

export default (options) => {
  return (
    useMutation(ACCEPT_CHAT, options)
  );
}
