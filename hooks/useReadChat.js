import { useMutation, gql } from '@apollo/client';

import { CHAT_FRAGMENT } from './useGetChat';

export const READ_CHAT = gql`
  mutation readChat($input: ReadChatInput!) {
    readChat(input: $input) {
      chat {
        ...ChatFragment
      }
    }
  }
${CHAT_FRAGMENT}
`

export default (options) => {
  return (
    useMutation(READ_CHAT, options)
  );
}
