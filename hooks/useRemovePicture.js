import { useMutation, gql } from '@apollo/client';

export const REMOVE_PICTURE = gql`
  mutation removePicture($input: RemovePictureInput!) {
    removePicture(input: $input) {
      id
    }
  }
`

export default (options) => {
  return (
    useMutation(REMOVE_PICTURE, options)
  );
}
