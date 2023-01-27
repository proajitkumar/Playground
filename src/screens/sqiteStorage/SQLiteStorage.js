import {View, StyleSheet, FlatList, Button} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Avatar, ListItem} from '@rneui/themed';
import {
  createTable,
  getDBConnection,
  getMembers,
  saveMembers,
} from './db-services';

const data = [
  {id: 101, value: 'Test 101'},
  {id: 102, value: 'Test 102'},
  {id: 103, value: 'Test 103'},
  {id: 104, value: 'Test 104'},
  {id: 105, value: 'Test 105'},
  {id: 106, value: 'Test 106'},
  {id: 107, value: 'Test 107'},
  {id: 108, value: 'Test 108'},
  {id: 109, value: 'Test 109'},
];
const List = ({data, onPress}) => {
  return (
    <ListItem onPress={onPress} containerStyle={styles?.listItemContainer}>
      <>
        <Avatar
          avatarStyle={{resizeMode: 'cover'}}
          rounded
          source={data?.image_url}
        />
      </>
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: 'bold'}}>
          {data?.name || data?.value}
        </ListItem.Title>
        <ListItem.Subtitle>{data?.id}</ListItem.Subtitle>
      </ListItem.Content>
      {/* <ListItem.Chevron /> */}
    </ListItem>
  );
};

const SQLiteStorage = () => {
  const [memberList, setMemberList] = useState([]);
  const handleItemPress = () => {};

  const getMembersData = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedItems = await getMembers(db);
      if (storedItems?.length) {
        setMemberList(storedItems);
      }
      // else {
      // }
      //   await saveMembers(db, initList);
      //   setMemberList(initList);
    } catch (error) {
      console.log({error});
    }
  }, []);

  useEffect(() => {
    getMembersData();
  }, [getMembersData]);

  const insertMultipleMembers = async () => {
    const db = await getDBConnection();
    await saveMembers(db, data);
    getMembersData();
  };

  return (
    <View>
      <Button title="Insert Multiple members" onPress={insertMultipleMembers} />
      <FlatList
        data={memberList}
        // estimatedItemSize={2}
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <List data={item} onPress={() => handleItemPress(item)} />
        )}
      />
    </View>
  );
};

export default SQLiteStorage;

const styles = StyleSheet.create({
  listItemContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
});
