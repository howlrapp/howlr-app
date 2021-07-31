import React, { useCallback, useState } from 'react';
import { MenuItem, TopNavigationAction, Icon } from '@ui-kitten/components';

import useBlockUser from '../../hooks/useBlockUser';

import ThemedOverflowMenu from '../ThemedOverflowMenu';
import useViewer from '../../hooks/useViewer';
import { useNavigation } from '@react-navigation/native';

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
);

const UserActionsMenu = ({
  user,
  onPressReport,
}) => {
  const { id } = useViewer();
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

  const navigation = useNavigation();
  const onPressEdit = useCallback(() => {
    handleCloseMenu();
    navigation.navigate("ProfileRouter");
  }, []);

  return (
    <>
      <ThemedOverflowMenu
        anchor={renderMenuAction}
        visible={menuOpen}
        onBackdropPress={handleCloseMenu}
      >
        {
          id === user?.id ? (
            <MenuItem
              title='Edit'
              onPress={onPressEdit}
            />
          ) : (
            <>
              <MenuItem
                title='Report'
                onPress={onPressReport}
              />
              <MenuItem
                title='Block'
                onPress={handleBlockUser}
              />
            </>
          )
        }

      </ThemedOverflowMenu>
    </>
  );
}

export default React.memo(UserActionsMenu);
