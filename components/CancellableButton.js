import React from 'react';
import { Button, Text } from '@ui-kitten/components';
import { truncate } from 'lodash';

import ButtonAction from './ButtonAction';

const CancellableButton = React.forwardRef(({
  label,
  onPress,
  onClear,
  hasValue = false,
  style,
  size,
  ...props
}, ref) => {
  return (
    <Button
      ref={ref}
      size={size}
      style={style}
      onPress={onPress}
      accessoryRight={(props) => {
        if (!hasValue) {
          return (null);
        }

        return (
          <ButtonAction
            iconName="close-circle"
            onPress={onClear}
            {...props}
          />
        );
      }}
      {...props}
    >
      {
        ({ style, ...props }) => (
          <Text
            numberOfLines={1}
            style={[ style ]}
          >
            {truncate(label, { length: 12 })}
          </Text>
        )
      }
    </Button>
  );
});

export default React.memo(CancellableButton);
