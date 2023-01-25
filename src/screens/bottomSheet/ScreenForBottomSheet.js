import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useRef} from 'react';
import CommonBottomSheet from './CommonBottomSheet';

const ScreenForBottomSheet = () => {
  const sheetRef = useRef(null);
  const openModal = () => {
    sheetRef?.current?.open();
  };
  const closeModal = () => {
    sheetRef?.current?.close();
  };

  return (
    <>
      {/* <StatusBar hidden={true} /> */}
      <View style={styles?.main}>
        <TouchableHighlight
          onPress={openModal}
          style={styles?.button}
          underlayColor={'red'}>
          <Text style={styles?.buttonText}>Open Bottom Sheet</Text>
        </TouchableHighlight>
      </View>
      <CommonBottomSheet ref={sheetRef}>
        <View style={styles?.modalContent}>
          <Text>Inside modal</Text>
          <TouchableHighlight
            onPress={closeModal}
            style={styles?.button}
            underlayColor={'cyan'}>
            <>
              <Text style={styles?.buttonText}>Close Bottom Sheet</Text>
            </>
          </TouchableHighlight>
          <View style={{height: 400, backgroundColor: 'red'}} />
        </View>
      </CommonBottomSheet>
    </>
  );
};

export default ScreenForBottomSheet;

const styles = StyleSheet.create({
  main: {padding: 10, backgroundColor: '#eee', flex: 1},
  button: {
    backgroundColor: 'blue',
    marginVertical: 4,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {color: '#fff'},
  modalContent: {
    backgroundColor: '#fff',
    height: 550,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
