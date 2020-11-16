import { useMutation, gql } from '@apollo/client';

export const REMOVE_LIKE = gql`
  mutation removeLike($input: RemoveLikeInput!) {
    removeLike(input: $input) {
      id
    }
  }
`

export default (options) => {
  return (
    useMutation(REMOVE_LIKE, options)
  );
}
