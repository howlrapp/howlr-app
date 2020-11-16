import { useMutation, gql } from '@apollo/client';

export const REMOVE_MESSAGE = gql`
  mutation removeMessage($input: RemoveMessageInput!) {
    removeMessage(input: $input) {
      id
    }
  }
`

export default (options) => {
  return (
    useMutation(REMOVE_MESSAGE, options)
  );
}
