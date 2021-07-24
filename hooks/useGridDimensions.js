import {
  useResponsiveScreenWidth
} from "react-native-responsive-dimensions";
import Constants from 'expo-constants';
import * as Device from 'expo-device';

import useDeviceType from './useDeviceType';

const useGridDimensions = ({
  width,
  itemsSectionPadding = 20,
  imageSpacing = 2,
  itemsPerRowDivider = 1,
  responsive = false,
  preferredItemsPerRow,
}) => {
  const deviceType = useDeviceType();
  const deviceWidth = useResponsiveScreenWidth(100);

  const viewportWidth =
    (deviceType === Device.DeviceType.PHONE || !responsive) ? deviceWidth : Constants.manifest.extra.tabletBodyWidth

  const containerWidth = width || viewportWidth;
  const itemsWidth = containerWidth - itemsSectionPadding * 2;
  let itemsPerRow = Math.floor(Math.floor(containerWidth / Constants.manifest.extra.gridItemSize) / itemsPerRowDivider);
  if (itemsPerRow < 2) {
    itemsPerRow = 2;
  }
  if (itemsPerRow === preferredItemsPerRow - 1 || itemsPerRow === preferredItemsPerRow + 1) {
    itemsPerRow = preferredItemsPerRow;
  }

  const itemDimension = itemsWidth / itemsPerRow;
  const itemPaddingCorrection = (imageSpacing / (itemsPerRow - 1));

  return ({
    containerWidth,
    itemsWidth,
    itemsPerRow,
    itemDimension,
    itemPaddingCorrection,
    itemsSectionPadding,
    imageSpacing
  })
}

export default useGridDimensions;
