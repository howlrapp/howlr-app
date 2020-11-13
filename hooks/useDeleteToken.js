import { useMutation, gql } from '@apollo/client';

export const DELETE_TOKEN = gql`
  mutation deleteToken {
    deleteToken @client
  }
`;

export default (options) => {
  return (
    useMutation(DELETE_TOKEN, options)
  );
}
