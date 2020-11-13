import { useMutation, gql } from '@apollo/client';

import { GET_LIKES } from './useGetLikes';

export const REMOVE_LIKE = gql`
  mutation removeLike($input: RemoveLikeInput!) {
    removeLike(input: $input) {
      id
    }
  }
`

export default (options) => {
  return (
    useMutation(REMOVE_LIKE, {
      awaitRefetchQueries: true,
      refetchQueries: [{ query: GET_LIKES }],
      ...options
    })
  );
}
