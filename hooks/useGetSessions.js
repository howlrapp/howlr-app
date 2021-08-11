import { useQuery, gql } from '@apollo/client';

import { SESSION_FRAGMENT } from './useGetSession';

export const GET_SESSIONS = gql`{
  viewer {
    id
    sessions {
      ...SessionFragment
    }
  }
}
${SESSION_FRAGMENT}
`;

export default (options) => {
  return (
    useQuery(GET_SESSIONS, options)
  );
}
