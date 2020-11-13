import { useEffect, useState } from 'react';

import useActionCableConsumer from './useActionCableConsumer';

const useActionCableChannel = (params) => {
  const consumer = useActionCableConsumer();
  const [ connected, setConnected ] = useState(false);
  const [ data, setData ] = useState(null);

  useEffect(() => {
    if (!consumer) {
      return ;
    }

    const subscription = consumer.subscriptions.create(params, {
      connected() {
        setConnected(true)
      },
      received(data) {
        setData(data)
      },
    });

    return () => {
      consumer.subscriptions.remove(subscription);
    }
  }, [consumer, params])

  return ({ consumer, connected, data });
}

export default useActionCableChannel;
