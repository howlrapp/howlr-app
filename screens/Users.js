import React, { useMemo, useCallback, useEffect } from 'react';
import {
  Text,
  Divider,
  useTheme,
} from '@ui-kitten/components';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import { uniqBy, orderBy, truncate } from 'lodash';

import EmptyList from '../components/EmptyList';
import HomeTopNavigation from '../components/HomeTopNavigation';
import UserItem from '../components/users/UserItem';
import UsersSearchBar from '../components/users/UsersSearchBar';
import DistanceSeparator from '../components/users/DistanceSeparator';
import ResponsiveLayout from '../components/ResponsiveLayout';

import useGetUsersSearchCriteria from '../hooks/useGetUsersSearchCriteria';
import useSetUsersSearchCriteria from '../hooks/useSetUsersSearchCriteria';
import useGetUserSummaries from '../hooks/useGetUserSummaries';
import useViewer from '../hooks/useViewer';
import useApp from '../hooks/useApp';
import useGridDimensions from '../hooks/useGridDimensions';
import { computeDistance } from '../hooks/useDistance';

import { DEFAULT_USERS_SEARCH_CRITERIA } from '../graphql/apolloClient';
import ResponsiveList from '../components/ResponsiveList';

const UsersLists = React.memo(({ usersSearchCriteria }) => {
  const viewer = useViewer();
  const { maximumUsersCount } = useApp();

  const { data, loading: usersLoading, refetch, error } = useGetUserSummaries({
    variables: usersSearchCriteria,
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  });

  // refetch on viewer change
  useEffect(() => {
    refetch()
  }, [
    viewer.name,
    viewer.avatar,
    viewer.shareOnlineStatus,
    viewer.latitude,
    viewer.longitude,
    refetch
  ]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // reset usersSearchCriteria on error
  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  useEffect(() => {
    if (error) {
      setUsersSearchCriteria({
        variables: {
          usersSearchCriteria: DEFAULT_USERS_SEARCH_CRITERIA
        }
      })
    }
  }, [error]);

  useEffect(() => {
    if (usersLoading) {
      showMessage({
        message: "Loading results",
        hideOnPress: false,
        autoHide: false,
        withLoader: true,
      })
    } else {
      hideMessage();
    }
  }, [usersLoading])

  const userSummaries = data?.viewer?.userSummaries || [];

  const sortedUserSummaries = useMemo(() => {
    return (
      orderBy(userSummaries, ({ id }) => id === viewer.id, 'desc')
    );
  }, [userSummaries]);

  const usersByDistance = useMemo(() => {
    if (!sortedUserSummaries) {
      return ([]);
    }

    const usersByDistance =
      Object.values(
        uniqBy(sortedUserSummaries, 'id').reduce((usersByDistance, user) => {
          if (!usersByDistance[user.distance]) {
            usersByDistance[user.distance] = {
              distance: user.distance,
              key: user.distance,
              data: [],
            };
          }
          usersByDistance[user.distance].data.push(user)

          return usersByDistance;
        }, {})
      )
      .sort((section1, section2) => (section1.distance - section2.distance));
    if (usersByDistance.length === 0) {
      return ([]);
    }

    return (usersByDistance);
  }, [sortedUserSummaries]);

  if (usersLoading) {
    return (null);
  }

  return (
    <UsersDistanceSections
      usersByDistance={usersByDistance}
      full={userSummaries.length === maximumUsersCount}
      refreshing={usersLoading}
      onRefresh={handleRefresh}
    />
  );
})

const UsersDistanceSections = React.memo(({
  usersByDistance,
  full,
  ...props
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { distanceUnit, localities, canChangeLocation } = useViewer();

  const {
    itemsSectionPadding,
    itemPaddingCorrection,
    itemsPerRow,
    itemDimension,
    imageSpacing,
  } = useGridDimensions({ imageSpacing: 12, preferredItemsPerRow: 4 });

  const lineHeight = itemDimension + itemPaddingCorrection + 20;

  const handlePressChangeLocation = useCallback(() => {
    navigation.navigate("ProfileRouter", {
      screen: 'ProfileForm',
      params: { openChangeLocation: true }
    })
  }, []);

  const renderSectionHeader = useCallback(({ section: { distance } }) => {
    if (distance === 0) {
      return (
        <DistanceSeparator
          height={lineHeight}
        >
          <TouchableOpacity
            style={styles.localityButton}
            onPress={handlePressChangeLocation}
          >
            <Text
              category="p1"
              style={styles.distanceText}
            >
              {'Near '}
              <Text
                category="s1"
                style={styles.distanceText}
              >
                {truncate([ localities[0], localities[1] ].join(', '), 40)}
              </Text>
            </Text>
            {
              canChangeLocation && (
                <Text
                  style={[ styles.changeLocationText, { color: theme['color-info-500'] } ]}
                >
                  Change your location
                </Text>
              )
            }
          </TouchableOpacity>
        </DistanceSeparator>
      )
    }

    return (
      <DistanceSeparator
        height={lineHeight}
        withStroke
      >
        <Text
          numberOfLines={1}
          category="p1"
          textDecorationLine='underline'
          style={styles.distanceText}
        >
          {'More than '}
          <Text
            category="s1"
            style={styles.distanceText}
          >
            {
              `${computeDistance(distance, distanceUnit)} ${distanceUnit}`
            }
          </Text>
        </Text>
      </DistanceSeparator>
    )
  }, [distanceUnit, lineHeight, localities, handlePressChangeLocation])

  const ListEmptyComponent = useCallback(() => (
    <EmptyList
      title="No results found"
    />
  ), []);

  const ListFooterComponent = useCallback(() => {
    if (!full) {
      return (null);
    }

    return (
      <DistanceSeparator
        height={lineHeight}
        style={styles.distanceText}
      >
        <Text>You have reached the limit of the number of results, please use filters to narrow down your search</Text>
      </DistanceSeparator>
    );
  }, [full, lineHeight]);

  const renderItem = useCallback(({ item, index}) => (
    <UserItem
      user={item}
      style={{
        width: itemDimension,
        paddingLeft: index % itemsPerRow * itemPaddingCorrection,
        marginLeft: itemsSectionPadding,
      }}
      size={itemDimension - imageSpacing}
    />
  ), [itemDimension, itemsPerRow, itemPaddingCorrection, itemsSectionPadding, imageSpacing]);

  if (usersByDistance.length === 0) {
    // React-native-super-grid doesn't handle listEmptyComponent very well on Android
    // so we just use a regular ResponsiveList in that case.
    return (
      <ResponsiveList
        ListEmptyComponent={ListEmptyComponent}
        data={[]}
      />
    )
  }

  return (
    <SectionGrid
      style={{
        backgroundColor: theme['background-basic-color-2'],
      }}
      itemContainerStyle={{
        width: itemDimension,
        height: lineHeight,
      }}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      keyExtractor={({ id }) => id}
      sections={usersByDistance}
      itemDimension={itemDimension}
      spacing={0}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      {...props}
    />
  );
});

const Users = () => {
  const { data: usersSearchCriteriaData } = useGetUsersSearchCriteria();
  const usersSearchCriteria = usersSearchCriteriaData?.usersSearchCriteria;

  if (!usersSearchCriteria) {
    return (null);
  }

  return (
    <>
      <HomeTopNavigation title="Search" />
      <ResponsiveLayout grow={false} background="background-basic-color-1">
        <UsersSearchBar usersSearchCriteria={usersSearchCriteria}  />
      </ResponsiveLayout>
      <Divider />
      <UsersLists usersSearchCriteria={usersSearchCriteria} />
    </>
  );
}

const styles = StyleSheet.create({
  changeLocationText: {
    color: "blue",
    fontSize: 12,
    marginTop: 2,
  },
  localityButton: {
    flexDirection: 'column',
    alignItems: 'center',
  }
})

export default React.memo(Users);
