import { useMutation, gql } from '@apollo/client';

export const ADD_REPORT = gql`
  mutation addReport($input: AddReportInput!) {
    addReport(input: $input) {
      id
    }
  }
`;

export default (options) => {
  return (
    useMutation(ADD_REPORT, options)
  );
}
