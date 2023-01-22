import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ListItem} from '@rneui/themed';
import {screenList} from '../navigation/RootNavigation';
import {FlatList} from 'react-native';

const List = ({data, onPress}) => {
  return (
    <ListItem onPress={onPress} containerStyle={styles?.listItemContainer}>
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: 'bold'}}>
          {data?.title || data?.name}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron size={25} color={'#000000'} />
    </ListItem>
  );
};

const Home = ({navigation}) => {
  const onPress = name => {
    if (navigation?.navigate && name) {
      navigation?.navigate(name);
    }
  };
  return (
    <View style={styles?.main}>
      <FlatList
        data={screenList}
        contentContainerStyle={styles?.flatListContentContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <List data={item} onPress={() => onPress(item?.name)} />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {flex: 1},
  listItemContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,
  },
  flatListContentContainer: {paddingTop: 10},
});
