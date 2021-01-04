import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/screens/RootNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store';
import RootStackScreen from './src/screens/RootStackScreen';
const App = () => {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <RootStackScreen />
        </NavigationContainer>    
    </PersistGate>
  </Provider>



    
  );
};

export default App;
