import { ApolloClient, ApolloLink, HttpLink, gql } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { showMessage } from "react-native-flash-message";
import { setContext } from '@apollo/client/link/context';

import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GET_USERS_SEARCH_CRITERIA } from '../hooks/useGetUsersSearchCriteria';
import { GET_TOKEN } from '../hooks/useToken';
import { GET_COLOR_SCHEME } from '../hooks/useGetColorScheme';

export const DEFAULT_USERS_SEARCH_CRITERIA = {
  __typename: 'UsersSearchCriteria',
  genderIds: [],
  sexualOrientationIds: [],
  relationshipStatusIds: [],
  groupIds: [],
  matchKindIds: [],
  online: null,
  recent: null,
  q: "",
};

/* eslint-disable */
const cache = new InMemoryCache({
  typePolicies: {
    UsersSearchCriteria: {
      fields: {
        groupIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        genderIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        relationshipStatusIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        sexualOrientationIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        matchKindIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
      },
    },
    Viewer: {
      fields: {
        genderIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        sexualOrientationIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        likes: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        groupIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        matchKindIds: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        events: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        },
        eventsAsParticipant: {
          merge(_existing = [], incoming = []) {
            return incoming;
          },
        }
      },
    },
  },
});
/* eslint-enable */

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token', token);

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 10000,
    jitter: true
  },
  attempts: {
    max: Infinity,
    retryIf: (error) => {
      return (!!error.message.match(/Network/))
    }
  }
});

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'development' ? Constants.manifest.extra.developmentApiUrl : Constants.manifest.extra.productionApiUrl,
  credentials: 'same-origin',
})

let client = new ApolloClient({
  typeDefs: gql`
    type UsersSearchCriteria {
      genderIds: [String!]
      sexualOrientationIds: [String!]
      relationshipStatusIds: [String!]
      groupIds: [String!]
      matchKindIds: [String!]
      online: Boolean
      recent: Boolean
      q: String
    }
  `,
  resolvers: {
    Query: {
      token: async () => {
        const token = await AsyncStorage.getItem('token');

        return token;
      },
      colorScheme: async () => {
        const colorScheme = await AsyncStorage.getItem('colorScheme');

        return colorScheme;
      },
      usersSearchCriteria: async () => {
        const usersSearchCriteriaString = await AsyncStorage.getItem('usersSearchCriteria');
        if (!usersSearchCriteriaString) {
          return (DEFAULT_USERS_SEARCH_CRITERIA);
        }
        return { ...DEFAULT_USERS_SEARCH_CRITERIA, ...JSON.parse(usersSearchCriteriaString) };
      },
    },
    Mutation: {
      setToken: async (_, { token }, { cache }) => {
        await AsyncStorage.setItem('token', token);
        cache.writeQuery({
          query: GET_TOKEN,
          data: { token }
        })
        return null;
      },
      deleteToken: async (_, _params, { cache }) => {
        await AsyncStorage.removeItem('token');

        cache.writeQuery({
          query: GET_TOKEN,
          data: { token: null }
        })
        return null;
      },
      setColorScheme: async (_, { colorScheme }, { cache }) => {
        await AsyncStorage.setItem('colorScheme', colorScheme);
        cache.writeQuery({
          query: GET_COLOR_SCHEME,
          data: { colorScheme }
        })
        return null;
      },
      setUsersSearchCriteria: async (_, { usersSearchCriteria }, { cache }) => {
        await AsyncStorage.setItem('usersSearchCriteria', JSON.stringify(usersSearchCriteria))

        cache.writeQuery({
          query: GET_USERS_SEARCH_CRITERIA,
          data: { usersSearchCriteria }
        })
      },
    }
  },
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      var skipMessage = false;

      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

          if (path == "sessionByCode") { // we already show an error on sessionByCode
            skipMessage = true;
          }
        });
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
      if (!skipMessage) {
        showMessage({
          message: "Unexpected error"
        })
      }
    }),
    retryLink,
    authLink.concat(httpLink),
  ]),
  cache
});

client.onResetStore(async () => {
  await AsyncStorage.removeItem('usersSearchCriteria');
});

export default client;
