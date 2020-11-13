import { useQuery, gql } from '@apollo/client';

import { VIEWER_FRAGMENT } from './useGetViewer';
import { LIKE_FRAGMENT } from './useGetLikes';
import { CHAT_FRAGMENT_WITH_MESSAGES } from './useGetChat';

export const VIEWER_FRAGMENT_DEEP = gql`
  fragment ViewerFragmentDeep on Viewer {
    ...ViewerFragment
    chats {
      ...ChatFragmentWithMessages
    }
    likes {
      ...LikeFragment
    }
  }
${VIEWER_FRAGMENT}
${LIKE_FRAGMENT}
${CHAT_FRAGMENT_WITH_MESSAGES}`;

export const GET_VIEWER_DEEP = gql`{
  viewer {
    ...ViewerFragmentDeep
  }
}
${VIEWER_FRAGMENT_DEEP}
`;

export default (options) => {
  return (
    useQuery(GET_VIEWER_DEEP, options)
  );
}
