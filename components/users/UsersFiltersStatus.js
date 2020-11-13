import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Portal } from 'react-native-portalize';
import { CheckBox,  Text, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { without } from 'lodash';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import useApp from '../../hooks/useApp';

import ResponsiveModalize from '../ResponsiveModalize';
import FormTopNavigation from '../FormTopNavigation';

const UsersFiltersStatus = ({
  open,
  loading,
  onSave,
  onClose,
  value,
}) => {
  const theme = useTheme();

  const { matchKinds } = useApp();

  const modalizeRef = useRef(null);

  const [ tmpValue, setTmpValue ] = useState(value)
  useEffect(() => (
    setTmpValue(value)
  ), [value]);

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

  const handleSave = () => {
    if (onSave) {
      onSave(tmpValue);
    }
    handleClose();
  }

  const handleOnlineChange = useCallback((checked) => {
    setTmpValue((tmpValue) => ({ ...tmpValue, online: checked }))
  }, [setTmpValue]);

  const handleRecentChange = useCallback((checked) => {
    setTmpValue((tmpValue) => ({ ...tmpValue, recent: checked }))
  }, [setTmpValue]);

  const handleChangeMatchKind = useCallback((matchKind, checked) => {
    if (checked) {
      setTmpValue(tmpValue => ({ ...tmpValue, matchKindIds: [ ...tmpValue.matchKindIds, matchKind.id ] }));
    } else {
      setTmpValue(tmpValue => ({ ...tmpValue, matchKindIds: without(tmpValue.matchKindIds, matchKind.id) }));
    }
  });

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        modalStyle={{ backgroundColor: theme['background-basic-color-1'] }}
        onClose={onClose}
      >
        <FormTopNavigation
          title="Status filters"
          saveLabel="Done"
          disabled={loading}
          onCancel={handleClose}
          onSave={handleSave}
        />
        <Text
          style={[ styles.categoryTitle, styles.categoryTitleFirst ]}
          category="c2"
          appearance="hint"
        >
          LISTING
        </Text>
        <CheckBox
          onChange={handleOnlineChange}
          checked={tmpValue.online}
          disabled={loading}
          style={styles.checkbox}
        >
          Online now
        </CheckBox>
        <CheckBox
          onChange={handleRecentChange}
          checked={tmpValue.recent}
          disabled={loading}
          style={styles.checkbox}
        >
          Users who joined recently
        </CheckBox>
        <Text
          style={[ styles.categoryTitle ]}
          category="c2"
          appearance="hint"
        >
          LOOKING FOR
        </Text>
        {
          matchKinds.map((matchKind) => (
            <CheckBox
              key={matchKind.id}
              onChange={(checked) => handleChangeMatchKind(matchKind, checked)}
              checked={tmpValue.matchKindIds.includes(matchKind.id)}
              disabled={loading}
              style={styles.checkbox}
            >
              {matchKind.label}
            </CheckBox>
          ))
        }
      </ResponsiveModalize>
    </Portal>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    paddingVertical: 8,
    paddingLeft: 10,
  },
  categoryTitle: {
    paddingBottom: 10,
    paddingTop: 20,
    paddingLeft: 10,
  },
  categoryTitleFirst: {
    paddingTop: 0,
  },
})

export default React.memo(UsersFiltersStatus);
