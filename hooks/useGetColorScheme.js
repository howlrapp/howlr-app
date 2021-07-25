import { useQuery, gql } from '@apollo/client';

export const GET_COLOR_SCHEME = gql`
  query getColorScheme @client {
    colorScheme @client(always: true)
  }
`;

export default (options) => {
  return (
    useQuery(GET_COLOR_SCHEME, options)
  );
}
