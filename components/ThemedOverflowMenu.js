import React from 'react';
import { OverflowMenu } from '@ui-kitten/components';

const ThemedOverflowMenu = (props) => {
  return (
    <OverflowMenu
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      {...props}
    />
  )
}

export default React.memo(ThemedOverflowMenu);
