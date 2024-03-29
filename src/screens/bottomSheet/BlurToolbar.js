import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const IMAGE_SIZE = 200;

const BlurToolbar = () => {
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Copy</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Paste</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Crop</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Search</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Send</Text>
      </View>
    </View>
  );

  const renderHeader = () => <View style={styles.header} />;

  let fall = new Animated.Value(1);

  //   const animatedShadowOpacity = Animated.interpolate(fall, {
  //     inputRange: [0, 1],
  //     outputRange: [0.5, 0],
  //   });

  //   Animated.add(0.5, Animated.multiply(0.8, this.fall))

  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolateNode(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    );
  };

  return (
    <Animated.View style={styles.container}>
      <BottomSheet
        snapPoints={[500, 50]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        borderRadius={20}
        callbackNode={fall}
        enabledInnerScrolling={false}
      />
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={{position: 'absolute', zIndex: 1}}>
          Swipe up from very bottom
        </Text>
        <Image
          style={styles.map}
          source={require('../../assets/images/map-bg.jpg')}
        />
      </View>
      {/* <Animated.View
      // style={[styles?.backdrop, {opacity: animatedShadowOpacity}]}
      /> */}
      {renderShadow()}
    </Animated.View>
  );
};
export default BlurToolbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2f',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: '#2c2c2fAA',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    width: '100%',
    // height: 50,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  backdrop: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
});
