import {StyleSheet} from 'react-native';
import React from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import {FlashList} from '@shopify/flash-list';
import {superheros} from '../../utils/testData';
import {SharedElement} from 'react-navigation-shared-element';

const List = ({data, onPress}) => {
  return (
    <ListItem onPress={onPress} containerStyle={styles?.listItemContainer}>
      <SharedElement id={`item.${data?.id}.image_url`}>
        <Avatar
          avatarStyle={{resizeMode: 'cover'}}
          rounded
          source={data?.image_url}
        />
      </SharedElement>
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: 'bold'}}>
          {data?.name}
        </ListItem.Title>
        <ListItem.Subtitle>{data?.bio}</ListItem.Subtitle>
      </ListItem.Content>
      {/* <ListItem.Chevron /> */}
    </ListItem>
  );
};

const MemberList = ({navigation}) => {
  const handleItemPress = data => {
    navigation?.navigate('MemberDetails', {data});
  };
  return (
    <>
      <FlashList
        data={superheros}
        estimatedItemSize={200}
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <List data={item} onPress={() => handleItemPress(item)} />
        )}
      />
    </>
  );
};

export default MemberList;

const styles = StyleSheet.create({
  listItemContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
});
