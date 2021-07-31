import { useQuery, gql } from '@apollo/client';

import { EVENT_FRAGMENT } from './useGetEvents';

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    viewer {
      id
      event(id: $id) {
        ...EventFragment
      }
    }
  }
${EVENT_FRAGMENT}`;

export default (options) => {
  return (
    useQuery(GET_EVENT, options)
  );
}
