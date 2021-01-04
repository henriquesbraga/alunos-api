import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'ALUNOS-API',
      storage: AsyncStorage,
      whitelist: ['auth'],
    },
    reducers
  );

  return persistedReducers;
};