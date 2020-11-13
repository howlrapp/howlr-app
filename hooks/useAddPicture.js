import { useMutation, gql } from '@apollo/client';

export const ADD_PICTURE = gql`
  mutation addPicture($input: AddPictureInput!) {
    addPicture(input: $input) {
      picture {
        id
        pictureUrl
        thumbnailUrl
        createdAt
      }
    }
  }
`;

export default (options) => {
  return (
    useMutation(ADD_PICTURE, options)
  );
}
