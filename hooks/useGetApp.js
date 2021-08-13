import { useQuery, gql } from '@apollo/client';

export const GROUP_FRAGMENT = gql`
  fragment GroupFragment on Group {
    id
    name
    groupCategoryId
    usersCount
    createdAt
  }
`

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
    maximumJoinedGroupsCount
    eventsMaximumSearchableDistance
    eventsMaxPerWeek
    codeBotUsername
    
    websiteLink
    githubLink
    logo
    changelogs {
      id
      createdAt
      body
    }
    groups {
      ...GroupFragment
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
      system
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
    tosItems {
      id
      title
      order
      body
    }
    privacyPolicyItems {
      id
      title
      order
      body
    }
    faqItems {
      id
      title
      order
      body
    }
  }
${GROUP_FRAGMENT}`;

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
