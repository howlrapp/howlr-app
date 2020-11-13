import { useMutation, gql } from '@apollo/client';

export const REMOVE_SESSION = gql`
  mutation removeSession($input: RemoveSessionInput!) {
    removeSession(input: $input) {
      id
    }
  }
`

export default (options) => {
  return (
    useMutation(REMOVE_SESSION, options)
  );
}
