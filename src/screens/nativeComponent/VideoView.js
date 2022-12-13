import PropTypes from 'prop-types';
import {requireNativeComponent} from 'react-native';
var viewProps = {
  name: 'VideoView',
  propTypes: {
    url: PropTypes.string,
    // ...ViewPropTypes,
  },
};
module.exports = requireNativeComponent('VideoView', viewProps);
