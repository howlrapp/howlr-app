import React from 'react';
import ContentLoader from "react-native-easy-content-loader";
import { useTheme } from '@ui-kitten/components';

const ThemedContentLoader = (props) => {
  const theme = useTheme();

  return (
    <ContentLoader
      primaryColor={theme['color-basic-transparent-100']}
      secondaryColor={theme['color-basic-transparent-300']}
      {...props}
    />
  )
}

export default React.memo(ThemedContentLoader);
