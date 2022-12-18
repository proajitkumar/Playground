import {StyleSheet} from 'react-native';
import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  return (
    <>
      <RootNavigation />
    </>
  );
};

const styles = StyleSheet.create({
  flex: 1,
  backgroundColor: 'white',
});

export default App;
