import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Animated, {
  FadeIn,
  Layout,
  ZoomInEasyDown,
  ZoomInEasyUp,
} from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Text>Home</Text>
      {visible ? (
        <Animated.View
          entering={ZoomInEasyDown}
          exiting={ZoomInEasyUp}
          layout={Layout}>
          <View
            style={{
              height: 200,
              backgroundColor: 'coral',
              margin: 10,
              padding: 8,
              borderRadius: 8,
            }}>
            <Text>Animated Box</Text>
          </View>
        </Animated.View>
      ) : null}
      <Button
        onPress={() => setVisible(!visible)}
        style={{backgroundColor: 'blue', margin: 10}}
        textColor={'#fff'}>
        Click
      </Button>
    </View>
  );
};
const SettingsScreen = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
const AnimatedAssets = () => {
  return (
    <>
      <Tab.Navigator
        activeColor="#e91e63"
        inactiveColor="#3e2465"
        barStyle={{
          backgroundColor: 'cyan',
          borderWidth: 1,
          padding: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        screenOptions={{tabBarBadge: '1'}}
        shifting={true}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AnimatedAssets;
