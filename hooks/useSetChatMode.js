import { useMutation, gql } from '@apollo/client';

export const SET_CHAT_MODE = gql`
  mutation setChatMode($chatMode: String!) {
    setChatMode(chatMode: $chatMode) @client
  }
`;

export default (options) => {
  return (
    useMutation(SET_CHAT_MODE, options)
  );
}
