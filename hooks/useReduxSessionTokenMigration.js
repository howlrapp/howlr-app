import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useSetToken from './useSetToken';
import useToken from './useToken';

const useReduxSessionTokenMigration = () => {
  const [ loading, setLoading ] = useState(true);

  const tokenFromRedux = useSelector(state => (state.sessionToken));
  const dispatch = useDispatch();

  const { data: tokenData } = useToken();
  const token = tokenData?.token;

  const [ setToken ] = useSetToken();

  useEffect(() => {
    if (tokenFromRedux) {
      // we already have a new token, skip migration
      if (token) {
        setLoading(false);
        return;
      }

      // if not we set the session token to this new token
      setToken({ variables: { token: tokenFromRedux } });

      // and then we remove the old token from redux
      dispatch({ type: "SET_SESSION_TOKEN", payload: null });
    } else {
      // no token from redux, proceed
      setLoading(false);
    }
  }, [tokenFromRedux, token]);

  return ({ loading })
}

export default useReduxSessionTokenMigration;
