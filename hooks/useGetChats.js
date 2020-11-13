import { useQuery, gql } from '@apollo/client';

import { CHAT_FRAGMENT } from './useGetChat';

export const GET_CHATS = gql`{
  viewer {
    id
    chats {
      ...ChatFragment
    }
  }
}
${CHAT_FRAGMENT}
`;

export default (options) => {
  return (
    useQuery(GET_CHATS, options)
  );
}
