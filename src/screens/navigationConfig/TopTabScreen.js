import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Setting from '../Setting';

const Tab = createMaterialTopTabNavigator();

const TopTabScreen = ({navigation, route}) => {
  React.useEffect(() => {
    console.log({route});
  }, [route]);
  return (
    <Tab.Navigator initialRouteName={route?.params?.type}>
      <Tab.Screen
        name="Pending"
        component={Setting}
        options={{title: 'Pending'}}
      />
      <Tab.Screen name="Paid" component={Setting} options={{title: 'Paid'}} />
      <Tab.Screen name="Done" component={Setting} options={{title: 'Done'}} />
    </Tab.Navigator>
  );
};

export default TopTabScreen;
