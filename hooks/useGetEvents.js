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
    usersCount
    user {
      id
      name
      avatarUrl
      system
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
