import { useMutation, gql } from '@apollo/client';

import { GROUP_FRAGMENT } from './useGetApp';

export const LEAVE_GROUP = gql`
  mutation leaveGroup($input: LeaveGroupInput!) {
    leaveGroup(input: $input) {
      group {
        ...GroupFragment
      }
    }
  }
${GROUP_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(LEAVE_GROUP, options)
  );
}
