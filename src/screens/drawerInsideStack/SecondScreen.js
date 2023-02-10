import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';

const SecondScreen = ({navigation, route}) => {
  useEffect(() => {
    console.log({item: route?.params?.item});
  }, [route]);

  const goToMainScreen = () => {
    let item = route?.params?.item;
    let newItem = [...item, 5, 6, 8, 9, 10];
    console.log({newItem});
    navigation.navigate('Main', {item: newItem});
  };

  return (
    <View style={{padding: 10}}>
      <Text>SecondScreen</Text>
      <Button title={'Go to second screen'} onPress={goToMainScreen} />
    </View>
  );
};

export default SecondScreen;
