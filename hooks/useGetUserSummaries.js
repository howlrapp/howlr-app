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
    $q: String
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
        q: $q
      ) {
        id
        name
        avatarUrl
        online
        distance
        contributor
      }
    }
  }
`;

export default (options) => {
  return (
    useQuery(GET_USER_SUMMARIES, options)
  );
}
