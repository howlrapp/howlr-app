import { useQuery, gql } from '@apollo/client';

import { EVENT_FRAGMENT } from './useGetEvents';

export const VIEWER_FRAGMENT = gql`
  fragment ViewerFragment on Viewer {
    id
    name
    bio
    like
    dislike
    latitude
    longitude
    distanceUnit
    avatarUrl
    online
    shareOnlineStatus
    genderIds
    matchKindIds
    sexualOrientationIds
    relationshipStatusId
    groupIds
    birthdate
    hideBirthdate
    hideNotCommonGroups
    hideLikes
    hideCity
    maximumSearchableDistance
    allowChatNotification
    allowMessageNotification
    allowLikeNotification
    allowEventJoinedNotification
    allowEventCreatedNotification
    localities
    canChangeLocation
    canCreateEvent
    online
    profileFieldValues {
      id
      name
      value
    }
    blockedUsers {
      id
      name
    }
    pictures {
      id
      pictureUrl
      thumbnailUrl
      createdAt
    }
    eventsAsParticipant {
      ...EventFragment
    }
  }
${EVENT_FRAGMENT}`;

export const GET_VIEWER = gql`{
  viewer {
    ...ViewerFragment
  }
}
${VIEWER_FRAGMENT}
`;

export default (options) => {
  return (
    useQuery(GET_VIEWER, options)
  );
}
