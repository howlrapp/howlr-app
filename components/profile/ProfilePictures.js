import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Text, useTheme } from '@ui-kitten/components';
import { FlatGrid } from 'react-native-super-grid';
import { orderBy } from 'lodash';
import { useActionSheet } from '@expo/react-native-action-sheet'
import Constants from 'expo-constants';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import ProfilePicture from './ProfilePicture';

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';
import { GET_VIEWER } from '../../hooks/useGetViewer';
import usePickImage from '../../hooks/usePickImage';
import useAddPicture from '../../hooks/useAddPicture';
import useRemovePicture from '../../hooks/useRemovePicture';
import useGridDimensions from '../../hooks/useGridDimensions';

import PictureViewer from '../PictureViewer';
import ResponsiveLayout from '../ResponsiveLayout';

import showTransactionLoader from '../../utils/showTransactionLoader';

const renderAddPictureIcon = (props) => (
  <Icon name="camera" {...props} />
);

const ProfilePictures = () => {
  const { pictures } = useViewer();
  const { name } = useApp();
  const { bottom } = useSafeAreaInsets();

  const [ pictureViewerIndex, setPictureViewerIndex ] = useState(null);

  const sortedPictures = useMemo(() => (
    orderBy(pictures, (p) => new Date(p.createdAt), 'desc')
  ), [pictures]);

  const theme = useTheme();

  const pickImage = usePickImage();
  const [ addPicture, { loading: addPictureLoading } ] = useAddPicture();

  const handleAddImage = useCallback(async () => {
    const { uri } = await pickImage({
      aspect: Constants.manifest.extra.picturesRatio,
      width: 1080,
    });

    if (uri) {
      showTransactionLoader(() => (
        addPicture({
          variables: {
            input: {
              pictureUrl: uri
            }
          },
          awaitRefetchQueries: true,
          refetchQueries: [{ query: GET_VIEWER }],
        })
      ))
    }
  }, [addPicture]);

  const { showActionSheetWithOptions } = useActionSheet();

  const [ removePicture ] = useRemovePicture({
    refetchQueries: [{ query: GET_VIEWER }],
    awaitRefetchQueries: true,
  });

  const handleLongPress = useCallback((picture) => {
    showActionSheetWithOptions(
      {
        options: ['Delete picture', 'Cancel'],
        cancelButtonIndex: 1,
        title: 'Select action',
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          showTransactionLoader(() => (
            removePicture({ variables: { input: { pictureId: picture.id } } })
          ));
        }
      }
    )
  }, [removePicture]);

  const {
    itemsSectionPadding,
    itemDimension,
    itemPaddingCorrection,
    itemsPerRow,
    imageSpacing,
  } = useGridDimensions({ responsive: true, preferredItemsPerRow: 4 });

  const ListHeaderComponent = useCallback(() => (
    <Button
      onPress={handleAddImage}
      disabled={addPictureLoading}
      appearance="outline"
      style={styles.addPictureButton}
      accessoryLeft={renderAddPictureIcon}
    >
      ADD PICTURE
    </Button>
  ), [addPictureLoading, handleAddImage]);

  const ListFooterComponent = useCallback(() => (
    <View
      style={[
        styles.contentPolicyContainer,
        {
          backgroundColor: theme['background-basic-color-3'],
          marginTop: sortedPictures.length > 0 ? 20 : 0,
          marginBottom: 40,
        }
      ]}
    >
      <View style={styles.contentPolicyTop}>
        <Text category="c2" style={styles.contentPolicyTitle}>
          {`To comply with Apple and Google policies, the following content is forbidden on ${name}:`}
        </Text>
        <Text category="c1">Pornography</Text>
        <Text category="c1">Bare breasts with showing nipples</Text>
        <Text category="c1">Erections (bare or visible through clothing)</Text>
        <Text category="c1">Sex act simulation</Text>
      </View>

      <Text category="c2" style={styles.contentPolicyTitle}>
        {`The following content is also forbidden:`}
      </Text>
      <Text category="c1">Publicity</Text>
      <Text category="c1">Racist or offensive imagery</Text>
      <Text category="c1">Protected content you do not have rights to use</Text>
      <Text category="c1">Pictures or Photographs of another character or person</Text>
    </View>
  ), [theme]);

  const renderItem = useCallback(({ item, index }) => (
    <ProfilePicture
      size={itemDimension - imageSpacing}
      paddingCorrection={index % itemsPerRow * itemPaddingCorrection}
      picture={item}
      onLongPress={() => handleLongPress(item)}
      onPress={() => setPictureViewerIndex(index)}
    />
  ), [itemDimension, imageSpacing, itemsPerRow, itemPaddingCorrection, handleLongPress, setPictureViewerIndex]);

  return (
    <ResponsiveLayout>
      <FlatGrid
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingLeft: itemsSectionPadding,
          paddingRight: itemsSectionPadding,
          paddingTop: itemsSectionPadding,
          backgroundColor: theme['background-basic-color-2'],
        }}
        contentContainerStyle={{
          marginBottom: bottom,
        }}
        itemContainerStyle={{
          width: itemDimension,
          height: itemDimension + itemPaddingCorrection,
        }}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        itemDimension={itemDimension}
        spacing={0}
        data={sortedPictures}
        renderItem={renderItem}
      />
      <PictureViewer
        pictures={sortedPictures}
        index={pictureViewerIndex}
        onClose={() => setPictureViewerIndex(null)}
      />
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  addPictureButton: {
    marginBottom: 20
  },
  contentPolicyContainer: {
    borderRadius: 5,
    padding: 20,
  },
  contentPolicyTitle: {
    marginBottom: 5,
  },
  contentPolicyTop: {
    marginBottom: 10,
  }
});

export default React.memo(ProfilePictures);
