import { useMutation, gql } from '@apollo/client';

import { CHAT_FRAGMENT } from './useGetChat';

export const CLEAR_CHAT = gql`
  mutation clearChat($input: ClearChatInput!) {
    clearChat(input: $input) {
      chat {
        ...ChatFragment
      }
    }
  }
${CHAT_FRAGMENT}
`

export default (options) => {
  return (
    useMutation(CLEAR_CHAT, options)
  );
}
