import { useMutation, gql } from '@apollo/client';

export const REMOVE_CHAT = gql`
  mutation removeChat($input: RemoveChatInput!) {
    removeChat(input: $input) {
      id
    }
  }
`

export default (options) => {
  return (
    useMutation(REMOVE_CHAT, options)
  );
}
