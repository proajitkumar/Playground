import {Text, View, Button} from 'react-native';
import React, {Component} from 'react';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {item: [1, 2, 3, 4], data: {}};
  }
  goToSecondScreen = () => {
    this?.props?.navigation?.navigate('SecondScreen', {
      item: this?.state?.item,
    });
  };

  UNSAFE_componentWillReceiveProps(props) {
    console.log({componentWillReceiveProps: props?.route?.params});
  }

  componentDidMount() {
    let item = this?.props?.route?.params;
    // console.log({componentDidMount: item});
    this?.props?.navigation.addListener('focus', () => {
      //   console.log({focus: this?.props?.route?.params});
      // The screen is focused
      // Call any action
    });
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Text>Main</Text>
        <Button
          title={'Go to second screen'}
          onPress={() => this.goToSecondScreen()}
        />
      </View>
    );
  }
}
