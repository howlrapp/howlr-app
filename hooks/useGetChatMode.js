import { useQuery, gql } from '@apollo/client';

export const GET_CHAT_MODE = gql`
  query getChatMode @client {
    chatMode @client(always: true)
  }
`;

export default (options) => {
  return (
    useQuery(GET_CHAT_MODE, options)
  );
}
