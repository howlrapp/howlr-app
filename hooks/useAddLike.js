import { useMutation, gql } from '@apollo/client';

import { LIKE_FRAGMENT } from './useGetLikes';

export const ADD_LIKE = gql`
  mutation addLike($input: AddLikeInput!) {
    addLike(input: $input) {
      like {
        ...LikeFragment
      }
    }
  }
${LIKE_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(ADD_LIKE, options)
  );
}
