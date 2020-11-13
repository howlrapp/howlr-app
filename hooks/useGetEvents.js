import { useQuery, gql } from '@apollo/client';

export const EVENT_FRAGMENT = gql`
  fragment EventFragment on Event {
    id
    title
    date
    description
    address
    localities
    eventCategoryId
    privacyStatus
    user {
      id
      name
      avatarUrl
    }
    users {
      id
      name
      avatarUrl
    }
  }
`;

export const GET_EVENTS = gql`{
  viewer {
    id
    events {
      ...EventFragment
    }
  }
}
${EVENT_FRAGMENT}
`;

export default (options) => {
  return (
    useQuery(GET_EVENTS, options)
  );
}
