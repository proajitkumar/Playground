import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {SharedElement} from 'react-navigation-shared-element';

const MemberDetails = ({route}) => {
  const {data} = route?.params;
  useEffect(() => {
    // console?.log({route: route?.params?.data});
  }, [route]);

  return (
    <SafeAreaView style={styles?.safeAreaView}>
      <ScrollView style={styles?.main}>
        <View style={styles?.imageContainer}>
          {data?.image_url ? (
            <SharedElement id={`item.${data?.id}.image_url`}>
              <Image
                style={styles?.image}
                source={data?.image_url}
                resizeMode="cover"
              />
            </SharedElement>
          ) : null}
        </View>
        <View style={styles?.contentContainer}>
          <Text style={styles?.title}>{data?.name}</Text>
          <Text style={styles?.subtitle}>{data?.actor}</Text>
          <Text style={styles?.desc}>{data?.bio}</Text>
          <Text style={styles?.desc}>{data?.about}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

MemberDetails.sharedElements = route => {
  const {data} = route.params;
  return [
    {
      id: `item.${data?.id}.image_url`,
      animation: 'fade',
      resize: 'stretch',
      align: 'center-center',
    },
  ];
};

export default MemberDetails;

const styles = StyleSheet.create({
  safeAreaView: {flex: 1, backgroundColor: '#ffffff'},
  main: {flex: 1},
  imageContainer: {
    height: Dimensions?.get('window')?.width,
    backgroundColor: '#ffffff',
    padding: 40,
  },
  image: {width: '100%', height: '100%', borderRadius: 200},
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    paddingBottom: 12,
  },
  title: {fontSize: 26, fontWeight: '900', color: '#000'},
  subtitle: {fontSize: 18, color: 'red'},
  desc: {fontSize: 16, marginBottom: 10},
});
