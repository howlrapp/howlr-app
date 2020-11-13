import React, { useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';

import isDeepEqualBy from '../../utils/isDeepEqualBy';

const LastMessage = ({ chat, style }) => {
  const { id } = useViewer();
  const { matchKinds } = useApp();

  if (chat.previewMessage) {
    if (chat.previewMessage.body && chat.previewMessage.body.length > 0) {
      if (chat.previewMessage.senderId === id) {
        return (
          <Text
            style={style}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`You: ${chat.previewMessage.body}`}
          </Text>
        );
      } else {
        return (
          <Text
            style={style}
            numberOfLines={1}
            ellipsizeMode="tail"
            appearance="hint"
          >
            {chat.previewMessage.body}
          </Text>
        );
      }
    }
    else if (chat.previewMessage.pictureUrl) {
      if (chat.previewMessage.senderId === id) {
        return (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            appearance="hint"
            style={[ style ]}
          >
            {`Picture from you`}
          </Text>
        );
      } else {
        return (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            appearance="hint"
            style={[ style ]}
          >
            {`Picture`}
          </Text>
        );
      }
    } else {
      return (
        <Text
          style={style}
          appearance="hint"
        >
          {" "}
        </Text>
      );
    }
  }

  const chatMatchKind = useMemo(() => (
    matchKinds.find((matchKind) => matchKind.id === chat.matchKindId)
  ), [matchKinds, chat]);

  if (chatMatchKind) {
    if (chat.senderId === id) {
      return (
        <Text
          style={[ style ]}
          appearance="hint"
        >
          {`You want to `}
          <Text
            style={[ style, styles.emphasis ]}
          >
            {chatMatchKind.label.toLowerCase()}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text
          style={[ style ]}
          appearance="hint"
        >
          {`Wants to `}
          <Text
            style={[ style, styles.emphasis ]}
          >
            {chatMatchKind.label.toLowerCase()}
          </Text>
        </Text>
      );
    }
  }

  return (
    <Text
      style={style}
      appearance="hint"
    >
      {" "}
    </Text>
  );
}

const styles = StyleSheet.create({
  emphasis: {
    fontWeight: 'bold'
  }
});

export default React.memo(LastMessage, isDeepEqualBy(['style']));
