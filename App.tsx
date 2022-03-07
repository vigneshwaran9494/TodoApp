/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {FC} from 'react';
import InitialRoute from './src/navigation/Initial-route';
import {store} from './src/redux/store/store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings

LogBox.ignoreAllLogs();

const App: FC = () => {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <InitialRoute />
      </PersistGate>
    </Provider>
  );
};

export default App;
