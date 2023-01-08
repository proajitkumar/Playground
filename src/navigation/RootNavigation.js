import {} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeTab from './HomeTab';
import TopTabScreen from '../screens/navigationConfig/TopTabScreen';
import MemberList from '../screens/sharedElement/MemberList';
import MemberDetails from '../screens/sharedElement/MemberDetails';

const Stack = createSharedElementStackNavigator();

const RootNavigation = () => {
  const options = {
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{...TransitionPresets.SlideFromRightIOS}}
      >
        <Stack.Screen name="MemberList" component={MemberList} />
        <Stack.Screen
          name="MemberDetails"
          component={MemberDetails}
          options={() => options}
        />
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
