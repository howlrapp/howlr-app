import { useQuery, gql } from '@apollo/client';

export const GET_TOKEN = gql`
  query getToken @client {
    token @client(always: true)
  }
`;

export default (options) => {
  return (
    useQuery(GET_TOKEN, options)
  );
}
