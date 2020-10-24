import React, {Component} from 'react';
import {Colors} from '../Theme/Colors';
import CustomNavBar from '../Components/CustomHeader';
import {buildApiParams} from '../Utilities/Transform';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getAllInformation} from '../Utilities/Storage';
import {isEmpty} from 'lodash';
import {showMessage} from '../Utilities/UiUtilities';
import {addItem} from '../Services/ApiCaller';
import ProgressDialog from '../Components/ProgressDialog';

const INITIAL_STATE = {
  isDisabled: true,
  url: '',
  auth: '',
  template: '',
  params: {},
  isLoading: false,
};

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      url: '',
      auth: '',
      template: '',
      params: {},
      isLoading: false,
    };
  }
  
  componentDidMount() {
    this.props.navigation.addListener('focus', this.resetInfoHandler);
  }
  
  resetInfoHandler = () => {
    this.setState(INITIAL_STATE);
  };
  
  disableButton = () => this.setState({isDisabled: true});
  enableButton = (data = {}) => this.setState({isDisabled: false, ...data});
  
  onSuccess = async (rawData) => {
    const {isError, params} = await buildApiParams(rawData);
    if (isError) {
      return;
    }
    this.enableButton({params});
  };
  
  makeApiCall = async () => {
    if (this.state.isLoading) {
      return;
    }
    const {params} = this.state;
    const {url, auth, template} = await getAllInformation();
    if (isEmpty(url) || isEmpty(auth)) {
      showMessage({title: 'Configure info on setting page'});
      return {isError: true};
    }
    try {
      this.setState({isLoading: true, isDisabled: true});
      await addItem({url, auth, params, template});
    } catch (e) {
    } finally {
      this.setState({isLoading: false});
    }
  };
  
  render() {
    const {isDisabled} = this.state;
    return (
      <View style={styles.container}>
        <CustomNavBar isLogo isSetting />
        <View style={styles.container}>
          <QRCodeScanner
            onRead={this.onSuccess}
            showMarker
            reactivate={true}
            reactivateTimeout={3000}
            cameraStyle={{marginTop: -verticalScale(75)}}
            bottomContent={
              <TouchableOpacity
                activeOpacity={0.6}
                disabled={isDisabled}
                onPress={this.makeApiCall}
                style={[
                  styles.buttonContainer,
                  isDisabled && styles.disableButtonStyle,
                ]}>
                <Text style={styles.buttonText}>Send Request</Text>
              </TouchableOpacity>
            }
          />
        </View>
        <ProgressDialog display={this.state.isLoading} />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    backgroundColor: Colors.primary,
    paddingVertical: moderateScale(12),
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
  disableButtonStyle: {
    backgroundColor: 'lightgrey',
  },
});
