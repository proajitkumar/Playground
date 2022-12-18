import {} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeTab from './HomeTab';
import TopTabScreen from '../screens/navigationConfig/TopTabScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen
          name="TopTabScreen"
          component={TopTabScreen}
          options={{...TransitionPresets.SlideFromRightIOS}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
