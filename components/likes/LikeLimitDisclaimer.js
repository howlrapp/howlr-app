import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import useApp from '../../hooks/useApp';
// import useLikes from '../../hooks/useLikes';

const LikeLimitDisclaimer = ({ active }) => {
  const { maximumLikesCount } = useApp();

  if (!active) {
    return (null);
  }

  return (
    <Text
      category="c1"
      appearance="hint"
      style={styles.disclaimer}
    >
      {`This listing is limited to your last ${maximumLikesCount} likes`}
    </Text>
  )
}

const styles = StyleSheet.create({
  disclaimer: {
    textAlign: 'center',
    padding: 20,
  }
})

export default React.memo(LikeLimitDisclaimer);
