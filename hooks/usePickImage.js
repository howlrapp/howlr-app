import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import { Alert } from 'react-native';
import useResponsiveActionSheet from './useResponsiveActionSheet';

const handleDenied = () => {
  Alert.alert(
    `We needs more permission`,
    'You previously denied access to your photos or camera, you can usually manually change permissions in your phone settings.',
    [
      {
        text: 'Cancel',
        style: 'cancel'
      },
    ],
    { cancelable: true }
  );
}

const handleProcessPhoto = async (pickerResult, { width, height }) => {
  let resizedImage = await ImageManipulator.manipulateAsync(
    pickerResult.uri,
    [
      {
        resize: {
          width,
          height
        },
      },
    ],
    {
      compress: 0.9,
      format: 'jpeg',
      base64: true,
    }
  );
  if (!resizedImage) {
    return (null);
  }

  return ({ uri: 'data:image/jpeg;base64,' + resizedImage.base64 })
}

const handleChooseFromLibrary = async ({ aspect, ...options }) => {
  const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
  if (status !== 'granted') {
    handleDenied();
    return ;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
    allowsEditing: true,
    aspect,
    exif: false,
  });

  return (
    handleProcessPhoto(pickerResult, options)
  )
}

const handleTakePhoto = async ({ aspect, ...options }) => {
  const { status: cameraRollStatus } = await ImagePicker.requestCameraRollPermissionsAsync();
  if (cameraRollStatus !== 'granted') {
    handleDenied();
    return ;
  }
  const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
  if (cameraStatus !== 'granted') {
    handleDenied();
    return ;
  }

  const pickerResult = await ImagePicker.launchCameraAsync({
    mediaTypes: "Images",
    allowsEditing: true,
    aspect,
    exif: false,
  });

  return (
    handleProcessPhoto(pickerResult, options)
  )
}

const usePickImage = () => {
  const showActionSheetWithOptions = useResponsiveActionSheet();

  const pickImage = useCallback((options) => (
    new Promise((resolve) => {
      showActionSheetWithOptions(
        {
          options: ['Choose from library', 'Take photo', 'Cancel'],
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
          case 0:
            resolve(handleChooseFromLibrary(options));
            break;
          case 1:
            resolve(handleTakePhoto(options))
            break;
          }
        }
      )
    })
  ), [showActionSheetWithOptions]);

  return (pickImage);
}

export default usePickImage;
