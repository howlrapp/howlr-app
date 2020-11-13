import { useMutation, gql } from '@apollo/client';

import { EVENT_FRAGMENT } from './useGetEvents';

export const INSERT_EVENT = gql`
  mutation insertEvent($input: InsertEventInput!) {
    insertEvent(input: $input) {
      event {
        ...EventFragment
      }
    }
  }
${EVENT_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(INSERT_EVENT, options)
  );
}
