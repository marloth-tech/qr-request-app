import React from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native';
import {ICON_TYPES} from '../Utilities/Constants';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const VectorIcon = props => {
  const {name, type, size, color, style} = props;
  switch (type) {
    case ICON_TYPES.AntDesign:
      return <AntDesign style={style} name={name} size={size} color={color} />;
    case ICON_TYPES.IonIcons:
      return <IonicIcons style={style} name={name} size={size} color={color} />;
    case ICON_TYPES.FontAwesome:
      return (
        <FontAwesomeIcons style={style} name={name} size={size} color={color} />
      );
    case ICON_TYPES.FontAwesome5:
      return (
        <FontAwesome5Icons
          style={style}
          name={name}
          size={size}
          color={color}
        />
      );
    case ICON_TYPES.SimpleLineIcons:
      return (
        <SimpleLineIcons style={style} name={name} size={size} color={color} />
      );
    case ICON_TYPES.MaterialIcons:
      return (
        <MaterialIcons style={style} name={name} size={size} color={color} />
      );
    case ICON_TYPES.MaterialCommunityIcons:
      return (
        <MaterialCommunityIcons
          style={style}
          name={name}
          size={size}
          color={color}
        />
      );
    case ICON_TYPES.Entypo:
      return (
        <EntypoIcons style={style} name={name} size={size} color={color} />
      );
    case ICON_TYPES.EvilIcons:
      return <EvilIcons style={style} name={name} size={size} color={color} />;
    case ICON_TYPES.Octicons:
      return <Octicons style={style} name={name} size={size} color={color} />;
    case ICON_TYPES.Feather:
      return <Feather style={style} name={name} size={size} color={color} />;
    default:
      return (
        <EntypoIcons style={style} name={name} size={size} color={color} />
      );
  }
};

export default VectorIcon;

VectorIcon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

VectorIcon.defaultProps = {
  name: '',
  type: '',
  size: moderateScale(18),
  color: 'grey',
  style: {},
};
