import { useMutation, gql } from '@apollo/client';

import { VIEWER_FRAGMENT } from './useGetViewer';

export const UPDATE_VIEWER = gql`
  mutation updateViewer($input: UpdateViewerInput!) {
    updateViewer(input: $input) {
      viewer {
        ...ViewerFragment
      }
    }
  }
${VIEWER_FRAGMENT}`;

export default (options) => {
  return (
    useMutation(UPDATE_VIEWER, options)
  );
}
