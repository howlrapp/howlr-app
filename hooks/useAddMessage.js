import { useMutation, gql } from '@apollo/client';

export const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on Message {
    id
    body
    senderId
    createdAt
    thumbnailUrl
    pictureUrl
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($input: AddMessageInput!) {
    addMessage(input: $input) {
      message {
        ...MessageFragment
      }
    }
  }
${MESSAGE_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(ADD_MESSAGE, options)
  );
}
