import { useMutation, gql } from '@apollo/client';

export const REMOVE_ACCOUNT = gql`
  mutation removeAccount($input: RemoveAccountInput!) {
    removeAccount(input: $input) {
      id
    }
  }
`

export default (options) => {
  return (
    useMutation(REMOVE_ACCOUNT, options)
  );
}
