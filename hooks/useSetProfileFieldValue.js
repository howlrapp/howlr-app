import { useMutation, gql } from '@apollo/client';

export const SET_PROFILE_FIELD_VALUE = gql`
  mutation setProfileFieldValue($input: SetProfileFieldValueInput!) {
    setProfileFieldValue(input: $input) {
      profileFieldValue {
        id
        name
        value
        restricted
      }
    }
  }
`;

export default () => {
  return (
    useMutation(SET_PROFILE_FIELD_VALUE)
  );
}


