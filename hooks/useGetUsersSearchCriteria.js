import { useQuery, gql } from '@apollo/client';

export const USERS_SEARCH_CRITERIA_FRAGMENT = gql`
  fragment UsersSearchCriteriaFragment on UsersSearchCriteria {
    id
    genderIds
    sexualOrientationIds
    relationshipStatusIds
    groupIds
    matchKindIds
    online
    recent
    q
  }
`

export const GET_USERS_SEARCH_CRITERIA = gql`
  query getUsersSearchCriteria @client {
    usersSearchCriteria @client(always: true) {
      ...UsersSearchCriteriaFragment
    }
  }
${USERS_SEARCH_CRITERIA_FRAGMENT}`;

export default (options) => {
  return (
    useQuery(GET_USERS_SEARCH_CRITERIA, options)
  );
}
