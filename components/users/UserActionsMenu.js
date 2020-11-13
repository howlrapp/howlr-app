import React, { useCallback, useState } from 'react';
import { MenuItem, TopNavigationAction, Icon } from '@ui-kitten/components';

import useBlockUser from '../../hooks/useBlockUser';

import ThemedOverflowMenu from '../ThemedOverflowMenu';

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
);

const UserActionsMenu = ({
  user,
  onPressReport,
}) => {
  const [ menuOpen, setMenuOpen ] = useState(false);

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  });

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  })

  const blockUser = useBlockUser();
  const handleBlockUser = useCallback(() => {
    blockUser(user?.id);
  }, [user?.id]);

  const renderMenuAction = useCallback(() => (
    <TopNavigationAction icon={MenuIcon} onPress={handleOpenMenu}/>
  ), []);

  return (
    <>
      <ThemedOverflowMenu
        anchor={renderMenuAction}
        visible={menuOpen}
        onBackdropPress={handleCloseMenu}
      >
        <MenuItem
          title='Report'
          onPress={onPressReport}
        />
        <MenuItem
          title='Block'
          onPress={handleBlockUser}
        />
      </ThemedOverflowMenu>
    </>
  );
}

export default React.memo(UserActionsMenu);
