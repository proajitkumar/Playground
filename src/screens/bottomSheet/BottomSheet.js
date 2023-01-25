import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = forwardRef(({children}, ref) => {
  const [visible, setVisible] = useState(false);
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const context = useSharedValue({y: 0});
  const scrollTo = useCallback(destination => {
    'worklet';
    active.value = destination !== 0;

    translateY.value = withSpring(destination, {damping: 50});
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  const open = useCallback(() => {
    // setVisible(true);
    scrollTo(-400);
  }, []);
  const close = useCallback(() => {
    scrollTo(0);
  }, []);

  useImperativeHandle(ref, () => ({scrollTo, isActive, open, close}), [
    scrollTo,
    isActive,
    open,
    close,
  ]);
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });
  return (
    <>
      {/* <Modal transparent={true} visible={visible}>
        <TouchableWithoutFeedback>
          <View style={styles?.overlay} />
        </TouchableWithoutFeedback>
      </Modal> */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles?.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles?.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    elevation: 10,
    // borderWidth: 1,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
