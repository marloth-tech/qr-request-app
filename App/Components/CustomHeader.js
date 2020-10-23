import React from 'react';
import * as _ from 'lodash';
import {Colors} from '../Theme/Colors';
import {moderateScale, scale} from 'react-native-size-matters';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import VectorIcon from './VectorIcon';
import {ICON_TYPES} from '../Utilities/Constants';
import {NavigationService} from '../Services/NavigatorServices';

const CustomNavBar = (props = {}) => {
  const {isLogo = false, isBack,isSetting=false,isSaveIcon=false,backgroundColor=Colors.primary} = props || {};
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={backgroundColor} />
      <View style={[styles.rowContainer, props.container,{backgroundColor}]}>
        <View style={styles.leftContainer}>
          {isBack && (
            <TouchableOpacity onPress={NavigationService.goBack}>
              <VectorIcon
                name={'chevron-left'}
                type={ICON_TYPES.Feather}
                size={moderateScale(35)}
                color={Colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.middleContainer}>
          {!_.isEmpty(props.title) && (
            <Text style={styles.labelStyle}>{props.title}</Text>
          )}
          {isLogo && (
            <Image
              source={require('../Images/logo1.png')}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.rightContainer}>
          {isSetting && (
            <TouchableOpacity onPress={()=>NavigationService.navigate('SettingScreen')}>
              <VectorIcon
                name={'setting'}
                type={ICON_TYPES.AntDesign}
                size={moderateScale(35)}
                color={Colors.white}
              />
            </TouchableOpacity>
          )}
          {isSaveIcon && (
            <TouchableOpacity onPress={props.onPressRightIcon}>
              <VectorIcon
                name={'save'}
                type={ICON_TYPES.MaterialIcons}
                size={moderateScale(30)}
                color={Colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomNavBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelStyle: {
    color: Colors.white,
    fontSize: moderateScale(16),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(54),
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingLeft: scale(10),
    paddingRight: scale(10),
  },
  image: {
    width: scale(130),
    resizeMode: 'contain',
    height: moderateScale(45),
  },
  leftContainer: {
    width: scale(40),
    height: moderateScale(40),
  },
  middleContainer: {},
  logoStyle: {},
  rightContainer: {
    alignItems: 'center',
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
  },
});
