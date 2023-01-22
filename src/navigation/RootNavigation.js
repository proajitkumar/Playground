import {} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {TransitionPresets} from '@react-navigation/stack';
import HomeTab from './HomeTab';
import TopTabScreen from '../screens/navigationConfig/TopTabScreen';
import MemberList from '../screens/sharedElement/MemberList';
import MemberDetails from '../screens/sharedElement/MemberDetails';
import DigihealthOCR from '../screens/ocr';
import Home from '../screens/Home';
import BottomSheet from '../screens/bottomSheet/BottomSheet';

const Stack = createSharedElementStackNavigator();

export const screenList = [
  {
    name: 'MemberList',
    component: MemberList,
  },
  {
    name: 'MemberDetails',
    component: MemberDetails,
  },
  {
    name: 'BottomTab',
    component: HomeTab,
  },
  {
    name: 'TopTab',
    component: TopTabScreen,
  },
  {
    name: 'DigihealthOCR',
    title: 'Digihealth OCR',
    component: DigihealthOCR,
  },
  {
    name: 'BottomSheet',
    title: 'Bottom Sheet',
    component: BottomSheet,
  },
];

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
        <Stack.Screen name="Home" component={Home} />
        {screenList?.map(screen => {
          return (
            <Stack.Screen
              name={screen?.name}
              component={screen?.component}
              options={{...screen?.options, title: screen?.title}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
