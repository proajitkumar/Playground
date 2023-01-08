import {View, Text, NativeModules, Button} from 'react-native';
import React, {useEffect} from 'react';
var CRC32 = require('crc-32');
const {GetDeviceInfo} = NativeModules;

const input = 'Java Code Geeks - Java Examples';
const Home = () => {
  useEffect(() => {
    // let crcVal = CRC32.str(input);
    // console.log({crcVal});
  }, []);

  const onPress = () => {
    console.log('We will invoke the native module here!');
    GetDeviceInfo.getAndroidId(res => console.log({androidId: res}));
  };

  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
    </View>
  );
};

export default Home;
