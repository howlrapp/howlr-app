import React, { useRef, useEffect, useCallback } from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, Platform } from 'react-native';
import { isEmpty } from 'lodash';
import { Portal } from 'react-native-portalize';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import ResponsiveModalize from './ResponsiveModalize';
import FormTopNavigation from './FormTopNavigation';

const FormModal = ({
  children,
  onSave,
  onCancel,
  open,
  disabled,
  invalid,
  title,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  description,
  loading,
  ...props
}) => {
  const modalizeRef = useRef(null);

  useEffect(() => {
    if (open) {
      !disabled && modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [open])

  const handleSave = useCallback(async () => {
    if (onSave) {
      await onSave();
    }
    modalizeRef.current?.close();
  }, [onSave]);

  const handleCancel = useCallback(() => {
    modalizeRef.current?.close();
    if (onCancel) {
      onCancel();
    }
  }, [modalizeRef]);

  const HeaderComponent = useCallback(() => (
    <>
      <FormTopNavigation
        title={title}
        onSave={handleSave}
        onCancel={handleCancel}
        disabled={disabled || loading}
        loading={loading}
        invalid={invalid}
        saveLabel={saveLabel}
        cancelLabel={cancelLabel}
      />
      {
        !isEmpty(description) && (
          <Text
            category="c1"
            appearance="hint"
            style={[ styles.description, { paddingBottom: 10 } ]}
          >
            {description}
          </Text>
        )
      }
    </>
  ), [title, saveLabel, cancelLabel, handleSave, handleCancel, loading])

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        HeaderComponent={HeaderComponent}
        keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        closeOnOverlayTap={false}
        {...props}
      >
        <SafeAreaView
          edges={["bottom", "left", "right"]}
          style={styles.childrenView}
        >
          {open && children}
        </SafeAreaView>
      </ResponsiveModalize>
    </Portal>
  );
}

const styles = StyleSheet.create({
  childrenView: {
    paddingHorizontal: 10,
    paddingVertical: 0
  },
  description: {
    paddingHorizontal: 10,
  }
})

export default React.memo(FormModal);
