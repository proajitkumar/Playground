import PropTypes from 'prop-types';
import {requireNativeComponent} from 'react-native';
var viewProps = {
  name: 'TextInput',
  propTypes: {
    url: PropTypes.string,
    // ...ViewPropTypes,
  },
};
module.exports = requireNativeComponent('TextInput', viewProps);
