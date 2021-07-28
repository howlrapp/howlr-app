import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';

import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';

import UsersSearchBarGroupsButton from './UsersSearchBarGroupsButton';
import UsersSearchBarProfileButton from './UsersSearchBarProfileButton';

import SearchBar from '../SearchBar';

const UsersSearchBar = ({ usersSearchCriteria }) => {
  const [ query, setQuery ] = useState("");
  useEffect(() => (
    setQuery(usersSearchCriteria?.q)
  ), [usersSearchCriteria?.q])

  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();

  const handleSaveProfile = useCallback((value) => {
    setUsersSearchCriteria({
      variables: {
        usersSearchCriteria: {
          ...usersSearchCriteria,
          ...value
        }
      }
    });
  }, [usersSearchCriteria, setUsersSearchCriteria]);

  const handleSaveGroupIds = useCallback((value) => {
    setUsersSearchCriteria({
      variables: {
        usersSearchCriteria: {
          ...usersSearchCriteria,
          groupIds: value
        }
      }
    });
  }, [usersSearchCriteria, setUsersSearchCriteria]);

  const handleChangeQuery = useCallback((event) => {
    setUsersSearchCriteria({
      variables: {
        usersSearchCriteria: {
          ...usersSearchCriteria,
          q: event.nativeEvent.text
        }
      }
    });
  }, [usersSearchCriteria, setUsersSearchCriteria]);

  const handleClearQuery = useCallback(() => {
    setUsersSearchCriteria({
      variables: {
        usersSearchCriteria: {
          ...usersSearchCriteria,
          q: ""
        }
      }
    });
    Keyboard.dismiss();
  }, [usersSearchCriteria, setUsersSearchCriteria]);

  if (!usersSearchCriteria) {
    return (null);
  }

  const renderFilterButtons = useCallback(() => (
    <View
      style={styles.root}
    >
      <UsersSearchBarProfileButton
        value={usersSearchCriteria}
        onSave={handleSaveProfile}
        style={[ styles.button, styles.firstButton ]}
        size="tiny"
      />
      <UsersSearchBarGroupsButton
        value={usersSearchCriteria.groupIds}
        onSave={handleSaveGroupIds}
        style={[ styles.button ]}
        size="tiny"
      />
    </View>
  ), [usersSearchCriteria, handleSaveProfile, handleSaveGroupIds]);

  return (
    <SearchBar
      accessoryLeft={renderFilterButtons}
      placeholder="Search users"
      onSubmitEditing={handleChangeQuery}
      autoCompleteType="username"
      value={query}
      onChangeText={setQuery}
      onClear={handleClearQuery}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 4,
  },
  firstButton: {
    marginLeft: 0,
  }
})

export default React.memo(UsersSearchBar);
