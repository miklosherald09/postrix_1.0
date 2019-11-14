import React from 'react'
import { StyleSheet, View, Text, DatePickerAndroid, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import TransactionSearch from '../components/TransactionSearch'
import { updateReportEmail, updateReportEmailState } from '../actions/settingsActions'
import SettingsNav from '../navigation/SettingsNav'

const ReportSetupScreen = (props) => {

	const { reportEmail } = props.settings
	
	const navLink = (nav, text) => {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
	}
	
	openMenu = () => {
  	props.navigation.openDrawer();
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.topMenu}>
				<View style={styles.topMenuLeft}>
					<MenuButton openMenu={this.openMenu.bind(this)} color="#333333"/>
				</View>
				<View style={styles.topMenuRight}>
					<TransactionSearch />
				</View>
			</View>
			<View style={styles.wrap}>
				<View style={styles.leftContent}>
					<SettingsNav />
				</View>
				<View style={styles.rightContent}>
					<View style={{backgroundColor: 'white', margin: 10, padding: 20, borderWidth: 1, borderColor: '#DDD'}}>
            <Text style={{marginBottom: 10}}>This will be used to send sales report (available soon) </Text>
            <TextInput
              placeholder="enter email"
							value={reportEmail}
							onChangeText={(text) => props.updateReportEmailState(text)}
              onSubmitEditing={ (e) => props.updateReportEmail(e.nativeEvent.text) }
              style={{marginTop: 5, borderWidth: 1, borderColor: '#CCC'}}
            />
          </View>
				</View>
			</View>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		settings: state.settings
	}
}

function mapDispatchToProps(dispatch) {
  return {
		updateReportEmail: (text) => { dispatch(updateReportEmail(text)) },
		updateReportEmailState: (text) => dispatch(updateReportEmailState(text))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportSetupScreen);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
		flexDirection: 'column',
  },
  topMenu: {
		height: 60,
		flexDirection: 'row',
    backgroundColor: 'white',
	},
  topMenuLeft: {
    flex: 4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CCC',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
	},
	topMenuRight: {
    flex: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContent: {
    flex: 4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CCC'

  },
  rightContent: {
    flex: 12,
    backgroundColor: '#EEE',
	},
	navLinks: {
		marginVertical: 20,
    marginHorizontal: 10
	},
	link: {
		fontSize: 20,
		color: '#333'
	}
});
