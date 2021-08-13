import { useQuery, gql } from '@apollo/client';

export const GET_USER_SUMMARIES = gql`
  query getUserSummaries(
    $groupIds: [String!],
    $genderIds: [String!],
    $sexualOrientationIds: [String!],
    $relationshipStatusIds: [String!],
    $matchKindIds: [String!],
    $online: Boolean,
    $recent: Boolean,
    $likedByMe: Boolean,
    $likingMe: Boolean,
    $ageIds: [String!],
    $q: String,
    $eventIds: [String!]
  ) {
    viewer {
      id
      userSummaries(
        groupIds: $groupIds,
        sexualOrientationIds: $sexualOrientationIds,
        genderIds: $genderIds,
        relationshipStatusIds: $relationshipStatusIds,
        matchKindIds: $matchKindIds,
        online: $online,
        recent: $recent,
        likedByMe: $likedByMe,
        likingMe: $likingMe,
        ageIds: $ageIds,
        q: $q,
        eventIds: $eventIds
      ) {
        id
        name
        avatarUrl
        online
        distance
      }
    }
  }
`;

export default (options) => {
  return (
    useQuery(GET_USER_SUMMARIES, options)
  );
}
