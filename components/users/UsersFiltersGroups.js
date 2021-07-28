import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Portal } from 'react-native-portalize';
import { Button, List, Icon, ListItem, useTheme, Autocomplete, AutocompleteItem, Divider, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { sampleSize, without } from 'lodash';
import { isEmpty, trim } from 'lodash';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import useApp from '../../hooks/useApp';
import useFuse from "../../hooks/useFuse";

import ResponsiveModalize from '../ResponsiveModalize';
import FormTopNavigation from '../FormTopNavigation';

import { GROUP_SEARCH_OPTIONS } from '../../screens/Groups';
import { usersCountString } from '../groups/GroupItem';

const CloseIcon = (props) => (
  <Icon {...props} name={'close-outline'} />
);

const UsersFiltersGroups = ({
  open,
  loading,
  onSave,
  onClose,
  value,
}) => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  const modalizeRef = useRef(null);
  const autocompleteRef = useRef(null);

  const [ tmpValue, setTmpValue ] = useState(value)
  useEffect(() => (
    setTmpValue(value)
  ), [value]);

  const { groups } = useApp();

  const selectedGroups = useMemo(() => (
    groups.filter(({ id }) => tmpValue.includes(id))
  ), [tmpValue, groups]);

  const notSelectedGroups = useMemo(() => (
    groups.filter(({ id }) => !tmpValue.includes(id))
  ), [tmpValue, groups]);

  useEffect(() => {
    if (open) {
      modalizeRef.current?.open();
    }
  }, [open])

  const handleClose = useCallback(() => {
    modalizeRef.current?.close();

    if (onClose) {
      onClose();
    }
  }, [modalizeRef, onClose]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(tmpValue)
    }
    handleClose();
  }, [tmpValue]);

  const HeaderComponent = useCallback(() => (
    <FormTopNavigation
      title="Groups"
      saveLabel="Done"
      disabled={loading}
      onCancel={handleClose}
      onSave={handleSave}
    />
  ), [loading, handleClose, handleSave]);

  const modalStyle = useMemo(() => ({
    backgroundColor: theme['background-basic-color-1']
  }), [theme]);

  const [matchString, setMatchString] = React.useState("");

  const searchResult = useFuse(notSelectedGroups, matchString, GROUP_SEARCH_OPTIONS);

  const searchedGroups = useMemo(() => {
    if (isEmpty(matchString)) {
      return ([]);
    }
    return (
      searchResult.map(({ item }) => item).slice(0, 10)
    )
  }, [matchString, searchResult]);

  const onChangeText = (matchString) => {
    setMatchString(matchString);
  };

  const handleSelectGroup = useCallback((index) => {
    autocompleteRef.current.clear();
    autocompleteRef.current.blur();

    setMatchString("");

    const group = searchedGroups[index];
    setTmpValue(tmpValue => [ group.id, ...tmpValue ]);
  }, [searchedGroups, setTmpValue, autocompleteRef]);

  const handleUnselectGroup = useCallback(({ id }) => {
    setTmpValue((tmpValue) => without(tmpValue, id))
  }, [setTmpValue]);

  const renderSelectedGroup = useCallback(({ item }) => {
    return (
      <ListItem
        title={item.name}
        description={usersCountString(item.usersCount)}
        accessoryRight={
          <Button
            size="small"
            appearance="ghost"
            status="basic"
            accessoryLeft={CloseIcon}
            onPress={() => handleUnselectGroup(item)}
          /> 
        }
      />
    )
  }, []);

  const placeholder = useMemo(() => (
    sampleSize(groups, 2)
      .map(({ name }) => trim(name))
      .join(', ')
  ), [groups]);

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={true}
        modalStyle={modalStyle}
        onClose={onClose}
        HeaderComponent={HeaderComponent}
      >
        <View
          style={styles.autocomplete}
        >
          <Autocomplete
            placeholder={`Ex: ${placeholder}…`}
            onSelect={handleSelectGroup}
            onChangeText={onChangeText}
            ref={autocompleteRef}
            placement="bottom start"
            size="large"
          >
            {
              searchedGroups.map((group) => (
                <AutocompleteItem
                  key={group.id}
                  title={group.name}
                />
              ))
            }
          </Autocomplete>
        </View>
        {
          selectedGroups.length === 0 ? (
            <Text
              appearance="hint"
              category="c2"
              style={styles.emptyListMessage}
            >
              No group selected
            </Text>
          ) : (
            <List
              renderItem={renderSelectedGroup}
              data={selectedGroups}
              ItemSeparatorComponent={Divider}
              style={[ styles.groupList, { marginBottom: bottom } ]}
            />  
          )
        }
      </ResponsiveModalize>
    </Portal>
  );
}

const styles = StyleSheet.create({
  autocomplete: {
    paddingHorizontal: 10
  },
  groupList: {
    marginTop: 6,
  },
  emptyListMessage: {
    marginTop: 56,
    textAlign: 'center'
  }
})

export default React.memo(UsersFiltersGroups);
