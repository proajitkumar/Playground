import {} from 'react-native';
import React from 'react';
import Main from './Main';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const DrawerInsideStack = ({route}) => {
  return (
    <>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={Main} />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerInsideStack;
