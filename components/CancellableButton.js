import React from 'react';
import { Button, Text } from '@ui-kitten/components';

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
            {...props}
            numberOfLines={1}
            style={[ style, { maxWidth: hasValue ? '75%' : '100%' } ]}
          >
            {label}
          </Text>
        )
      }
    </Button>
  );
});

export default CancellableButton;
