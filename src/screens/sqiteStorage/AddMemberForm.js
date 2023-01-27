import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';

const AddMemberForm = () => {
  const [name, setName] = useState('my name is AJIT');
  console.log({name});
  return (
    <View>
      <Text>SQLiteStorage</Text>
      <TextInput
        placeholder="Name"
        underlineColorAndroid={'red'}
        onChangeText={value => setName(value)}
        defaultValue={name}
      />
    </View>
  );
};

export default AddMemberForm;
