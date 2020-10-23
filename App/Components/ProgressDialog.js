import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Dimensions, Modal, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../Theme/Colors';

const {width, height} = Dimensions.get('window');

class ProgressDialog extends Component {
  static propTypes = {
    size: PropTypes.string,
    animating: PropTypes.bool,
    blocking: PropTypes.bool,
    cancelable: PropTypes.bool,
    display: PropTypes.any,
    indicatorStyle: PropTypes.any,
    isIndicatorMargin: PropTypes.bool,
  };

  static defaultProps = {
    size: 'large',
    animating: true,
    blocking: false,
    cancelable: true,
    display: false,
    indicatorStyle: {},
    isIndicatorMargin: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      hideModal: false,
      width: width,
      height: height,
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.changeScreen);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.changeScreen);
  }

  changeScreen = () => {
    const {width, height} = Dimensions.get('window');
    this.setState({
      width: width,
      height: height,
    });
  };
  renderLoading = () => {
    const {width, height} = this.state;
    const {size, animating, blocking} = this.props;
    let marginTop = -40;
    if (!blocking) {
      // minus half navbar height to center on screen if not blocking
      marginTop = marginTop - (Platform.OS === 'ios' ? 32 : 27);
    }
    return (
      <ActivityIndicator
        size={size || 'large'}
        style={[
          styles.indicatorStyle,
          {marginTop, top: height / 2, left: width / 2},
        ]}
        color={Colors.primary}
        animating={animating}
      />
    );
  };

  render() {
    const {blocking, cancelable, display} = this.props;
    const {hideModal} = this.state;
    if (display) {
      return blocking ? (
        <Modal
          animationType={'fade'}
          transparent
          visible={blocking && !hideModal}
          onRequestClose={() => {
            if (cancelable) {
              this.setState({hideModal: true});
            }
          }}>
          {this.renderLoading()}
        </Modal>
      ) : (
        this.renderLoading()
      );
    }
    return null;
  }
}

const styles = {
  indicatorStyle: {
    position: 'absolute',
    zIndex: 10,
    top: height / 2,
    left: width / 2,
    borderRadius: 5,
    width: 80,
    height: 80,
    marginLeft: -40,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
};

export default ProgressDialog;
