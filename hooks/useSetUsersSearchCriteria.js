import { useMutation, gql } from '@apollo/client';

export const SET_USERS_SEARCH_CRITERIA = gql`
  mutation setUsersSearchCriteria($usersSearchCriteria: UsersSearchCriteria!) {
    setUsersSearchCriteria(usersSearchCriteria: $usersSearchCriteria) @client
  }
`;

export default (options) => {
  return (
    useMutation(SET_USERS_SEARCH_CRITERIA, options)
  );
}
