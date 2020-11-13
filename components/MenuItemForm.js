import React, { useState, useCallback, useEffect } from 'react';
import { MenuItem, Text } from '@ui-kitten/components';
import { truncate } from 'lodash';

import FormModal from './FormModal';

const MenuItemForm = ({
  hint = null,
  title,
  onOpen,
  onClose,
  initialOpen = false,
  loading,
  disabled,
  ...props
}) => {
  const [ modalOpen, setModalOpen ] = useState(false);

  useEffect(() => {
    if (initialOpen) {
      handleOpenModal();
    }
  }, [])

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
    if (onOpen) {
      onOpen();
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    if (onClose) {
      onClose();
    }
  }, []);

  const renderHint = useCallback(() => (
    <Text
      appearance="hint"
      category="c1"
      numberOfLines={1}
      ellipsizeMode='head'
    >
      {(!loading && !disabled) && truncate(hint, 30)}
    </Text>
  ), [hint, loading]);

  return (
    <>
      <MenuItem
        onPress={handleOpenModal}
        title={title}
        disabled={disabled || loading}
        accessoryRight={renderHint}
      />
      <FormModal
        title={title}
        open={modalOpen}
        onClose={handleCloseModal}
        loading={loading}
        {...props}
      />
    </>
  )
}

export default React.memo(MenuItemForm);
