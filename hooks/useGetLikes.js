import { useQuery, gql } from '@apollo/client';

export const LIKE_FRAGMENT = gql`
  fragment LikeFragment on Like {
    id
    createdAt
    user {
      id
      name
      distance
      avatarUrl
      online
    }
  }
`;

export const GET_LIKES = gql`{
  viewer {
    id
    receivedLikes {
      ...LikeFragment
    }
    sentLikes {
      ...LikeFragment
    }
  }
}
${LIKE_FRAGMENT}
`;

export default (options) => {
  return (
    useQuery(GET_LIKES, options)
  );
}
