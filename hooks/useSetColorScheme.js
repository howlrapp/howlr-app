import { useMutation, gql } from '@apollo/client';

export const SET_COLOR_SCHEME = gql`
  mutation setColorScheme($colorScheme: String!) {
    setColorScheme(colorScheme: $colorScheme) @client
  }
`;

export default (options) => {
  return (
    useMutation(SET_COLOR_SCHEME, options)
  );
}
