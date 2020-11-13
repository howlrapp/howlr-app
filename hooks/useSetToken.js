import { useMutation, gql } from '@apollo/client';

export const SET_TOKEN = gql`
  mutation setToken($token: String!) {
    setToken(token: $token) @client
  }
`;

export default (options) => {
  return (
    useMutation(SET_TOKEN, options)
  );
}
