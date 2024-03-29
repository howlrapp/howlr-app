import React, { useMemo, useCallback, useEffect } from 'react';
import {
  Text,
  Divider,
  useTheme,
  Button,
  Icon,
} from '@ui-kitten/components';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';

import { RefreshControl, StyleSheet, View } from 'react-native';
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
import useGetEvent from '../hooks/useGetEvent';

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

  const { data: eventData, error: eventError } = useGetEvent({
    variables: {
      id: usersSearchCriteria.eventIds?.[0]
    },
    skip: usersSearchCriteria.eventIds?.length != 1
  });
  const event = eventData?.viewer?.event;

  // reset usersSearchCriteria on error
  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  useEffect(() => {
    if (error || eventError) {
      setUsersSearchCriteria({
        variables: {
          usersSearchCriteria: DEFAULT_USERS_SEARCH_CRITERIA
        }
      })
    }
  }, [error, eventError]);

  useEffect(() => {
    if (usersLoading) {
      showMessage({
        message: "",
        hideMessage: true,
        hideOnPress: false,
        autoHide: false,
        withLoader: true,
      })
    }
    else {
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
    if ((usersSearchCriteria.eventIds || []).length > 0) {
      return ([
        {
          event,
          key: "event",
          data: sortedUserSummaries
        }
      ])
    }

    if (!sortedUserSummaries || sortedUserSummaries.length === 0) {
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
  }, [sortedUserSummaries, usersSearchCriteria, event]);

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
  refreshing,
  onRefresh,
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

  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  const handlePressClearEvent = useCallback(() => {
    setUsersSearchCriteria({
      variables: {
        usersSearchCriteria: DEFAULT_USERS_SEARCH_CRITERIA
      }
    })
  }, [setUsersSearchCriteria]);

  const renderSectionHeader = useCallback(({ section: { distance, event } }) => {
    if (event) {
      return (
        <DistanceSeparator
          height={lineHeight}
        >
          <View
            style={styles.localityButton}
          >
            <Text
              category="p1"
              style={styles.distanceText}
            >
              {'Going to '}
              <Text
                category="s1"
                style={styles.distanceText}
              >
                {truncate(event.title, { length: 20 })}
              </Text>
            </Text>
            <Button
              status="basic"
              appearance="outline"
              style={[ styles.changeButton ]}
              size="small"
              onPress={handlePressClearEvent}
              accessoryLeft={({ style }) => (
                <Icon name="close-outline" style={style} />
              )}
            />  
          </View>
        </DistanceSeparator>
      )
    }

    if (distance === 0) {
      return (
        <DistanceSeparator
          height={lineHeight}
        >
          <View
            style={styles.localityButton}
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
                {truncate([ localities[0], localities[1] ].join(', '), { length: 20 })}
              </Text>
            </Text>
            {
              canChangeLocation && (
                <Button
                  status="basic"
                  appearance="outline"
                  style={[ styles.changeButton ]}
                  size="small"
                  onPress={handlePressChangeLocation}
                  accessoryLeft={({ style }) => (
                    <Icon name="edit-outline" style={style} />
                  )}
                />  
              )
            }
          </View>
        </DistanceSeparator>
      )
    }

    return (
      <DistanceSeparator
        height={lineHeight}
        withLine
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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme['text-basic-color']} />}
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
      <Divider style={styles.divider} />
      <UsersLists usersSearchCriteria={usersSearchCriteria} />
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginTop: 5,
  },
  changeLocationText: {
    color: "blue",
    fontSize: 12,
    marginTop: 2,
  },
  localityButton: {
    flexDirection: 'row',
    alignItems: 'center' 
  },
  changeButton: {
    height: 24,
    width: 24,
    borderRadius: 48,
    borderWidth: 1,
    marginLeft: 10
  }
})

export default React.memo(Users);
