import { useQuery, gql } from '@apollo/client';

export const SESSION_FRAGMENT = gql`
  fragment SessionFragment on Session {
    id
    expoToken
    version
  }
`;

export const GET_SESSION = gql`{
  session {
    ...SessionFragment
  }
}
${SESSION_FRAGMENT}
`;

export default (options) => {
  return (
    useQuery(GET_SESSION, options)
  );
}
