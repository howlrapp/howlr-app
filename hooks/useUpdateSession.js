import { useMutation, gql } from '@apollo/client';

import { SESSION_FRAGMENT } from './useGetSession';

export const UPDATE_SESSION = gql`
  mutation updateSession($input: UpdateSessionInput!) {
    updateSession(input: $input) {
      session {
        ...SessionFragment
      }
    }
  }
${SESSION_FRAGMENT}`;

export default (options) => {
  return (
    useMutation(UPDATE_SESSION, options)
  );
}
