import { useMutation, gql } from '@apollo/client';

import { CHAT_FRAGMENT } from './useGetChat';

export const ADD_CHAT = gql`
  mutation addChat($input: AddChatInput!) {
    addChat(input: $input) {
      chat {
        ...ChatFragment
      }
    }
  }
${CHAT_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(ADD_CHAT, options)
  );
}
