import {} from 'react-native';
import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RootNavigation />
    </GestureHandlerRootView>
  );
};

export default App;
