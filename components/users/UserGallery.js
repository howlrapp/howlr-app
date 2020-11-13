import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { orderBy } from 'lodash';

import useGridDimensions from '../../hooks/useGridDimensions';

import ProfilePicture from '../profile/ProfilePicture';
import PictureViewer from '../PictureViewer';

const UserGallery = ({ user, style }) => {
  const [ pictureViewerIndex, setPictureViewerIndex ] = useState(null);

  const {
    itemDimension,
    itemPaddingCorrection,
    itemsPerRow,
    imageSpacing,
  } = useGridDimensions({});

  const sortedPictures = useMemo(() => (
    orderBy(user.pictures, (p) => new Date(p.createdAt), 'desc')
  ), [user.pictures]);

  if (sortedPictures.length === 0) {
    return (null);
  }

  return (
    <>
      <View
        style={[ styles.root, style ]}
      >
        {
          sortedPictures.map((picture, index) => (
            <View
              key={picture.id}
              style={{
                width: itemDimension,
                height: itemDimension + itemPaddingCorrection
              }}
            >
              <ProfilePicture
                size={itemDimension - imageSpacing}
                paddingCorrection={index % itemsPerRow * itemPaddingCorrection}
                picture={picture}
                onPress={() => setPictureViewerIndex(index)}
                deletable={false}
              />
            </View>
          ))
        }
     </View>
     <PictureViewer
       pictures={sortedPictures}
       index={pictureViewerIndex}
       onClose={() => setPictureViewerIndex(null)}
     />
   </>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
})

export default React.memo(UserGallery);
