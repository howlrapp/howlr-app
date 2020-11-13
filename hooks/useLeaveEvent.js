import { useMutation, gql } from '@apollo/client';

import { EVENT_FRAGMENT } from './useGetEvents';

export const LEAVE_EVENT = gql`
  mutation leaveEvent($input: LeaveEventInput!) {
    leaveEvent(input: $input) {
      event {
        ...EventFragment
      }
    }
  }
${EVENT_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(LEAVE_EVENT, options)
  );
}
