import { useMutation, gql } from '@apollo/client';

import { GROUP_FRAGMENT } from './useGetApp';

export const JOIN_GROUP = gql`
  mutation joinGroup($input: JoinGroupInput!) {
    joinGroup(input: $input) {
      group {
        ...GroupFragment
      }
    }
  }
${GROUP_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(JOIN_GROUP, options)
  );
}
