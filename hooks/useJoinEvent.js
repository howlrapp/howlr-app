import { useMutation, gql } from '@apollo/client';

import { EVENT_FRAGMENT } from './useGetEvents';

export const JOIN_EVENT = gql`
  mutation joinEvent($input: JoinEventInput!) {
    joinEvent(input: $input) {
      event {
        ...EventFragment
      }
    }
  }
${EVENT_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(JOIN_EVENT, options)
  );
}
