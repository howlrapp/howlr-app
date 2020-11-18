import { useQuery, gql } from '@apollo/client';

export const APP_FRAGMENT = gql`
  fragment AppFragment on App {
    id
    name
    maximumUsersCount
    maximumNameLength
    maximumFieldsLength
    accountRemovalMonthsCount
    minimumAge
    locationChangeIntervalMinutes
    eventsMaximumSearchableDistance
    eventsMaxPerWeek
    codeBotUsername
    maximumLikesCount
    changelogs {
      id
      createdAt
      body
    }
    groups {
      id
      name
      groupCategoryId
      usersCount
      createdAt
    }
    genders {
      id
      name
      label
    }
    sexualOrientations {
      id
      name
      label
    }
    relationshipStatuses {
      id
      name
      label
    }
    matchKinds {
      id
      name
      label
    }
    groupCategories {
      id
      label
      createdAt
    }
    eventCategories {
      id
      label
      createdAt
    }
    profileFieldGroups {
      id
      label
      profileFields {
        id
        name
        label
        description
        pattern
        regexp
        deepLinkPattern
        appStoreId
        playStoreId
      }
    }
  }
`;

export const GET_APP = gql`
  query getApp($id: ID!) {
    app(id: $id) {
      ...AppFragment
    }
  }
${APP_FRAGMENT}
`;

export default (options) => {
  return (
    useQuery(GET_APP, options)
  );
}
