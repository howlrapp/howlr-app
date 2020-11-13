import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import { Text, Divider, useTheme } from '@ui-kitten/components';

import ScreenTopNavigation from '../components/ScreenTopNavigation';
import ResponsiveLayout from '../components/ResponsiveLayout';

import UserAvatar from '../components/UserAvatar';
import LikesCount from '../components/users/LikesCount';
import LikeButton from '../components/users/LikeButton';
import MessageButton from '../components/users/MessageButton';
import UserNameHeader from '../components/UserNameHeader';

import UserGallery from '../components/users/UserGallery';
import UserLoader from '../components/users/UserLoader';

import UserProfileItemBio from '../components/users/UserProfileItemBio';
import UserProfileItemLike from '../components/users/UserProfileItemLike';
import UserProfileItemDislike from '../components/users/UserProfileItemDislike';

import UserProfileNoteLocation from '../components/users/UserProfileNoteLocation';
import UserProfileNoteAge from '../components/users/UserProfileNoteAge';
import UserProfileNoteRelationshipStatus from '../components/users/UserProfileNoteRelationshipStatus';
import UserProfileNoteMatchKinds from '../components/users/UserProfileNoteMatchKinds';
import UserProfileNoteGendersAmdSexualOrientations from '../components/users/UserProfileNoteGendersAmdSexualOrientations';

import UserProfileGroupsCommon from '../components/users/UserProfileGroupsCommon';
import UserProfileGroupsNotCommon from '../components/users/UserProfileGroupsNotCommon';

import UserProfileProfileFieldValues from '../components/users/UserProfileProfileFieldValues';

import UserActionsMenu from '../components/users/UserActionsMenu';
import UserReportForm from '../components/users/UserReportForm';

import useGetUser from '../hooks/useGetUser';
import useViewer from '../hooks/useViewer';

const UserHeader = ({ user }) => {
  return (
    <ResponsiveLayout grow={false} background="background-basic-color-1">
      <View
        style={styles.headerRoot}
      >
        <View
          style={styles.headerInformation}
        >
          <View
            style={styles.userInformationLeft}
          >
            <Text
              category="h2"
              numberOfLines={1}
             >
               {user.name}
             </Text>
             <UserProfileNoteLocation
               user={user}
             />
          </View>
          <View
            style={styles.userInformationRight}
          >
            <UserAvatar user={user} size={48} />
          </View>
        </View>


        <View
          style={styles.headerAboutSummary}
        >
          <UserProfileNoteAge
            user={user}
            style={styles.headerAboutSummaryItem}
          />
          <UserProfileNoteGendersAmdSexualOrientations
            user={user}
            style={styles.headerAboutSummaryItem}
          />
          <UserProfileNoteRelationshipStatus
            user={user}
            style={styles.headerAboutSummaryItem}
          />
         <UserProfileNoteMatchKinds
            user={user}
            style={styles.headerAboutSummaryItem}
          />
        </View>

        <View
          style={styles.headerActions}
        >
          <LikeButton
            style={styles.headerActionsItemLeft}
            user={user}
          />
          <MessageButton
            style={styles.headerActionsItemRight}
            user={user}
          />
        </View>
      </View>
    </ResponsiveLayout>
  )
}

const User = ({ route: { params: { id } }}) => {
  const theme = useTheme();

  const { data } = useGetUser({
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const user = data?.viewer?.user;

  const { id: viewerId } = useViewer();

  const [ reportFormOpen, setReportFormOpen ] = useState(false);

  const handleOpenReportForm = useCallback(() => {
    setReportFormOpen(true)
  });

  const handleCloseReportForm = useCallback(() => {
    setReportFormOpen(false);
  })

  const renderRightActions = useCallback(() => {
    if (user?.id === viewerId) {
      return (null);
    }

    return (
      <UserActionsMenu
        user={user}
        onPressReport={handleOpenReportForm}
      />
    );
  }, [user, handleOpenReportForm]);

  const [ scrollY ] = useState(new Animated.Value(0));

  const navigationDefaultTitleOpacity =
    scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const navigationUserNameTitleOpacity =
    scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

  return (
    <>
      <ScreenTopNavigation
        title={({ style, ...props }) => {
          return (
            <>
              <Animated.Text
                style={[ style, styles.headerAnimatedItems, { opacity: navigationDefaultTitleOpacity }]}
                {...props}
              >
                Profile
              </Animated.Text>
              <Animated.View
                style={[ styles.headerAnimatedItems, { opacity: navigationUserNameTitleOpacity }]}
                {...props}
              >
                <UserNameHeader user={user} textProps={{ style, ...props }} />
              </Animated.View>
            </>
          )
        }}
        accessoryRight={renderRightActions}
      />
      <Animated.ScrollView
        contentContainerStyle={Platform.OS === 'ios' ? {} : styles.scrollViewContentContainerStyle}
        contentInsetAdjustmentBehavior="automatic"
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {user ? (
          <>
            <UserHeader user={user} />
            {
              !user.hideLikes && (
                <>
                  <Divider />
                  <LikesCount user={user} />
                </>
              )
            }
            <View
              style={[ styles.profileItems, { backgroundColor: theme['background-basic-color-2'] }]}
            >
              <View
                style={[ styles.profileItemsText ]}
              >
                <UserGallery
                  user={user}
                  style={styles.gallery}
                />
                <UserProfileItemBio
                  user={user}
                  style={styles.profileItem}
                />
                <UserProfileItemLike
                  user={user}
                  style={styles.profileItem}
                />
                <UserProfileItemDislike
                  user={user}
                  style={styles.profileItem}
                />
                <UserProfileProfileFieldValues
                  user={user}
                  style={styles.profileItem}
                />
                <UserProfileGroupsCommon
                  user={user}
                  style={styles.profileItem}
                />
                <UserProfileGroupsNotCommon
                  user={user}
                  style={styles.profileItem}
                />
              </View>
            </View>
          </>
        ) : (
          <UserLoader />
        )}
        <UserReportForm
          open={reportFormOpen}
          onClose={handleCloseReportForm}
          user={user}
        />
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerRoot: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
  headerInformation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userInformationLeft: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: '70%'
  },
  userInformationRight: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-start'
  },
  headerAboutSummary: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerAboutSummaryItem: {
    marginRight: 8,
  },
  headerActions: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
  },
  headerActionsItemRight: {
    flex: 1,
    marginLeft: 4,
  },
  headerActionsItemLeft: {
    flex: 1,
    marginRight: 4,
  },
  profileItems: {
    minHeight: '100%',
    paddingTop: 20,
  },
  profileItem: {
    marginBottom: 20,
  },
  gallery: {
    marginBottom: 18,
    paddingHorizontal: 20,
  },
  headerAnimatedItems: {
    position: 'absolute'
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1
  }
});

export default React.memo(User);
