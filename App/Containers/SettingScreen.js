import {isEmpty} from 'lodash';
import React, {Component} from 'react';
import {Colors} from '../Theme/Colors';
import {showMessage} from '../Utilities/UiUtilities';
import CustomNavBar from '../Components/CustomHeader';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
	getAllInformation,
	setAllInformation,
	stringifyJson,
} from '../Utilities/Storage';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class SettingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			auth: '',
			template: '',
		};
	}
	
	componentDidMount = () => {
		this.loadDataHandler();
	};
	
	loadDataHandler = async () => {
		const {url, auth, template} = await getAllInformation();
		this.setState({url, auth, template: stringifyJson(template)});
	};
	
	isJsonString = (str) => {
		try {
			JSON.parse(str);
			return true;
		} catch (e) {
			return false;
		}
	};
	
	onChangeText = ({value, valueKey}) => {
		this.setState({[valueKey]: value});
	};
	
	renderInput = (title, valueKey, multiline, numberOfLines, style) => {
		return (
			<View>
				<Text style={styles.titleStyle}>{title}</Text>
				<View style={[styles.inputContainer]}>
					<TextInput
						editable
						value={ this.state[valueKey] }
						multiline={ multiline || false }
						numberOfLines={ numberOfLines || 1 }
						onChangeText={ (value) => this.onChangeText({valueKey, value}) }
						style={ [ styles.inputStyle, multiline && {textAlignVertical: 'top'} ] }
					/>
				</View>
			</View>
		);
	};
	
	saveInfo = async () => {
		const {url, auth, template} = this.state;
		if (isEmpty(url)) {
			showMessage({title: 'URL is required'});
			return false;
		}
		if (isEmpty(auth)) {
			showMessage({title: 'Auth is required'});
			return false;
		}
		if (isEmpty(template)) {
			showMessage({title: 'Request Template is required'});
			return false;
		}
		if (!this.isJsonString(template)) {
			showMessage({title: 'Enter valid Request Template'});
			return false;
		}
		try {
			await setAllInformation({url, auth, template});
			showMessage({title: 'Saved successfully', buttonColor: 'green'});
		} catch (e) {
			showMessage({title: 'Error is found'});
		}
	};
	
	render() {
		return (
			<View style={styles.container}>
				<CustomNavBar
					title="Settings"
					isBack
					isSaveIcon
					onPressRightIcon={ this.saveInfo }
					backgroundColor={ Colors.background }
				/>
				<KeyboardAwareScrollView style={styles.container}>
					{this.renderInput('URL', 'url', false)}
					{this.renderInput('Auth', 'auth', false)}
					{this.renderInput('Request Template', 'template', true, 14, {
						flex: 1,
					})}
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleStyle: {
		marginTop: verticalScale(10),
		fontSize: moderateScale(16),
		marginHorizontal: scale(10),
	},
	inputContainer: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.6)',
		marginHorizontal: scale(10),
		backgroundColor: Colors.white,
		borderRadius: moderateScale(6),
		paddingHorizontal: scale(6),
	},
	inputStyle: {
		fontSize: moderateScale(16),
		textAlignVertical:'center'
	},
	buttonContainer: {
		width: '95%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: moderateScale(6),
		backgroundColor: Colors.primary,
		paddingVertical: moderateScale(12),
		marginTop: verticalScale(10),
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
