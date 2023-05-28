import {} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Setting from '../screens/Setting';

const Tab = createBottomTabNavigator();
const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      screenListeners={({navigation, route}) => ({
        tabPress: e => {
          e?.preventDefault();
          // console.log({route});
          navigation?.navigate('TopTab', {type: route?.params?.type});
        },
      })}>
      <Tab.Screen
        name="PendingScreen"
        initialParams={{type: 'Pending'}}
        component={Setting}
      />
      <Tab.Screen
        name="PaidScreen"
        initialParams={{type: 'Paid'}}
        component={Setting}
      />
      <Tab.Screen
        name="DoneScreen"
        initialParams={{type: 'Done'}}
        component={Setting}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
