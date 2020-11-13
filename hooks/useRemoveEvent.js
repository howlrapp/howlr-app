import { useMutation, gql } from '@apollo/client';

export const REMOVE_EVENT = gql`
  mutation removeEvent($input: RemoveEventInput!) {
    removeEvent(input: $input) {
      id
    }
  }
`

export default (options) => {
  return (
    useMutation(REMOVE_EVENT, options)
  );
}
