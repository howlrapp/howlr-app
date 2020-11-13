import { useEffect, useState } from 'react';
import Constants from 'expo-constants';

import { createConsumer } from '@rails/actioncable';

// see https://github.com/rails/rails/pull/36652#issuecomment-656151080
global.addEventListener = () => {};
global.removeEventListener = () => {};

const REMOTE_URL = process.env.NODE_ENV === 'development' ? Constants.manifest.extra.developmentCableUrl : Constants.manifest.extra.productionCableUrl

const useCreateActionCableConsumer = (token) => {
  const [ consumer, setConsumer ] = useState(null);

  useEffect(() => {
    if (!token) {
      setConsumer(null);
      return;
    }

    setConsumer(
      createConsumer(`${REMOTE_URL}/${token}`)
    );
  }, [token]);

  return (consumer);
}

export default useCreateActionCableConsumer;
