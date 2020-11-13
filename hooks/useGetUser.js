import { useQuery, gql } from '@apollo/client';

export const PICTURE_FRAGMENT = gql`
  fragment PictureFragment on Picture {
    id
    pictureUrl
    thumbnailUrl
    createdAt
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    viewer {
      id
      user(id: $id) {
        id
        name
        avatarUrl
        online
        groupIds
        genderIds
        matchKindIds
        sexualOrientationIds
        likedCount
        likersCount
        hideLikes
        age
        bio
        like
        dislike
        localities
        relationshipStatusId
        profileFieldValues {
          id
          name
          value
        }
        pictures {
          ...PictureFragment
        }
      }
    }
  }
  ${PICTURE_FRAGMENT}
`;

export default (options) => {
  return (
    useQuery(GET_USER, options)
  );
}
