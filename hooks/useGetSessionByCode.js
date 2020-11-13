import { useLazyQuery, gql } from '@apollo/client';

export const GET_SESSION_BY_CODE = gql`
  query getSessionByCode($code: String!) {
    sessionByCode(code: $code) {
      id
    }
  }
`;

export default (options) => {
  return (
    useLazyQuery(GET_SESSION_BY_CODE, options)
  );
}
