import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

const reducers = combineReducers({
  sessionToken: (state = null, action) => {
    if (action.type === "SET_SESSION_TOKEN") {
      return action.payload
    }
    return (state);
  }
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    whitelist: ['sessionToken'],
    storage: AsyncStorage,
  },
  reducers
);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
