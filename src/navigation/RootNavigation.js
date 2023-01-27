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
import ScreenForBottomSheet from '../screens/bottomSheet/ScreenForBottomSheet';
import BlurToolbar from '../screens/bottomSheet/BlurToolbar';
import SQLiteStorage from '../screens/sqiteStorage/SQLiteStorage';
import AddMemberForm from '../screens/sqiteStorage/AddMemberForm';

const Stack = createSharedElementStackNavigator();

export const screenList = [
  {
    name: 'SharedElement',
    title: 'Shared Element',
    component: MemberList,
  },
  {
    name: 'BottomTab',
    title: 'Bottom Tab',
    component: HomeTab,
  },
  {
    name: 'TopTab',
    title: 'Top Tab with Dynamic initial Params',
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
    component: ScreenForBottomSheet,
  },
  {
    name: 'SQLiteStorage',
    title: 'SQLite Storage',
    component: SQLiteStorage,
  },
];

const RootNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen name="Home" component={Home} />
          {screenList?.map(screen => {
            return (
              <React.Fragment key={screen?.name}>
                <Stack.Screen
                  name={screen?.name}
                  component={screen?.component}
                  options={{...screen?.options, title: screen?.title}}
                />
              </React.Fragment>
            );
          })}
          <Stack.Screen name={'MemberDetails'} component={MemberDetails} />
          <Stack.Screen name={'AddMemberForm'} component={AddMemberForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;
