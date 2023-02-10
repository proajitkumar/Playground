import {View, StyleSheet} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

const Header = () => (
  <View style={styles?.header}>
    <View style={styles?.headerLine} />
  </View>
);
const CommonBottomSheet = forwardRef(({children, snapPoints}, ref) => {
  const sheetRef = useRef(null);
  useImperativeHandle(ref, () => ({
    open: (index = 1) => {
      sheetRef?.current?.snapTo(index);
    },
    close: () => {
      sheetRef?.current?.snapTo(0);
    },
    snapTo: index => {
      sheetRef?.current?.snapTo(index);
    },
  }));
  const renderContent = () => (
    <View style={styles?.contentContainer}>{children}</View>
  );
  return (
    <>
      <BottomSheet
        ref={sheetRef}
        initialSnap={0}
        snapPoints={snapPoints}
        // borderRadius={16}
        renderContent={renderContent}
        renderHeader={() => <Header />}
      />
    </>
  );
});

export default CommonBottomSheet;

const styles = StyleSheet.create({
  header: {
    // top: -10,
    // position: 'absolute',
    width: '100%',
    height: 16,
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerLine: {
    alignSelf: 'center',
    backgroundColor: '#ccc',
    width: 60,
    height: 4,
    borderRadius: 10,
  },
  contentContainer: {
    // elevation: 5,
    // marginTop: 6,
    // borderRadius: 16,
    backgroundColor: '#fff',
  },
});

CommonBottomSheet.defaultProps = {
  snapPoints: ['0%', '55%', '80%'],
};
