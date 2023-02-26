import {View, StyleSheet, FlatList, Button} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import useDatabase from './useDatabase';
import Database from './database';

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

const db = Database.getInstance();
const SQLiteStorage = () => {
  const [memberList, setMemberList] = useState([]);

  const getMembersData = useCallback(async () => {
    try {
      const storedItems = await db.getMembers();
      console.log({storedItems});
      if (storedItems?.length) {
        setMemberList(storedItems);
      }
    } catch (error) {
      console.log({error});
    }
  }, []);

  const insertMultipleMembers = async () => {
    await db.saveMembers(data);
    getMembersData();
  };

  useEffect(() => {
    db.createTable();
    console.log({getDb: db});
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button title="Insert Multiple members" onPress={insertMultipleMembers} />
      <FlatList
        style={{flex: 1}}
        data={memberList}
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <List data={item} />}
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
