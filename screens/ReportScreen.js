import React from 'react'
import { StyleSheet, View, Text, DatePickerAndroid, TimePickerAndroid, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import TransactionSearch from '../components/TransactionSearch'
import SalesReport from '../components/SalesReport'
import ReceiptModal from '../components/modals/ReceiptModal'
import { Button } from 'react-native-elements'
import { changeStartDate, changeEndDate, generateSalesReport , changeStartTime, changeEndTime } from '../actions/reportsActions'
import { formatDate } from '../functions';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ReportScreen = (props) => {

	const { startDate, endDate, processing } = props.reports
	
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

	openStartDatePicker = async () => {
		try {
			const {action, year, month, day} = await DatePickerAndroid.open({
				date: new Date(),
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				date = new Date(year, month, day)
				props.changeStartDate(date.getTime())
				props.generateSalesReport()
			}
		} catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		}
	}

	openEndDatePicker = async () => {
		try {
			const {action, year, month, day} = await DatePickerAndroid.open({
				date: new Date(),
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				date = new Date(year, month, day)
				// date.setDate(date.getDate() + 1) // +1 day
				date.setDate(date.getDate() )
				props.changeEndDate(date.getTime())
				props.generateSalesReport()
			}
		} catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		}
	}

	openStartTimePicker = async () => {
		try {
			const {action, hour, minute} = await TimePickerAndroid.open({
				hour: 14,
				minute: 0,
				is24Hour: false, // Will display '2 PM'
				// date.setDate()
			});
			if (action !== TimePickerAndroid.dismissedAction) {
				// Selected hour (0-23), minute (0-59)
				// console.log('hour: '+hour)
				// console.log('minute: '+minute)
				time = ((hour * 60 * 60) + (minute * 60)) * 1000
				props.changeStartTime(time)
				props.generateSalesReport()
			}
		} catch ({code, message}) {
			console.warn('Cannot open time picker', message)
		}
	}

	openEndTimePicker = async () => {
		try {
			const {action, hour, minute} = await TimePickerAndroid.open({
				hour: 14,
				minute: 0,
				is24Hour: false, // Will display '2 PM'
			});
			if (action !== TimePickerAndroid.dismissedAction) {
				// Selected hour (0-23), minute (0-59)
				time = ((hour * 60 * 60) + (minute * 60)) * 1000
				props.changeEndTime(time)
				props.generateSalesReport()
			}
		} catch ({code, message}) {
			console.warn('Cannot open time picker', message);
		}
	}
	
	handleEmail = () => {
		alert('Feature will be availble soon!')
		// const to = ['miklos.herald@gmail.com'] // string or array of email addresses
		// email(to, {
		// 		// Optional additional arguments
		// 		cc: ['miklos_herald@yahoo.com'], // string or array of email addresses
		// 		bcc: 'mee@mee.com', // string or array of email addresses
		// 		subject: 'Show how to use',
		// 		body: 'Some body right here'
		// }).catch(console.error)
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
					<ScrollView>
            <View style={styles.navLinks}>
							{navLink('Reports', 'Reports')}
							{/* {navLink('ReportSetup', 'Setup')} */}
            </View>
          </ScrollView>
				</View>
				<View style={styles.rightContent}>
					<View style={{height: 50, flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
						{/* <Text>startDate: {startDate}</Text> */}
						<DatePicker onPress={ () => this.openStartDatePicker() }/>
						<TimePicker onPress={ () => this.openStartTimePicker() }/>
						<TextInput 
							style={styles.inputStyle} 
							value={(startDate)?formatDate(startDate, 2):''} 
							placeholder={'start date'} 
						/>
						<DatePicker onPress={ () => this.openEndDatePicker() }/>
						<TimePicker onPress={ () => this.openEndTimePicker() }/>
						<TextInput 
							style={styles.inputStyle} 
							value={(endDate)?formatDate(endDate, 2):''} 
							placeholder={'end date'} 
						/>
					</View>
					<View style={{flex: 1}}>
						{ !processing ? <SalesReport />: <Loading /> }
					</View>
				</View>
			</View>
			<ReceiptModal />
		</View>
	);
}

class Loading extends React.Component{
	render(){
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" />
			</View>
		)
	}
}

class DatePicker extends React.Component{
	render(){
		return (
			<Button
					type="clear"
					buttonStyle={{marginRight: 0}}
					onPress={ this.props.onPress }
					containerStyle={{marginBottom: 5}}
					icon={
						<Icon
							name="calendar"
							size={25}
							color="#2089dc"
						/>
					}
				/>
		)
	}
} 

class TimePicker extends React.Component{
	render(){
		return (
			<Button
					type="clear"
					buttonStyle={{marginRight: 0}}
					onPress={ this.props.onPress }
					containerStyle={{marginBottom: 5}}
					icon={
						<Icon
							name="clock"
							size={25}
							color="#2089dc"
						/>
					}
				/>
		)
	}
} 

function mapStateToProps(state) {
	return {
		reports: state.reports
	}
}

function mapDispatchToProps(dispatch) {
  return {
		changeStartDate: (date) => { dispatch(changeStartDate(date)) },
		changeEndDate: (date) => dispatch(changeEndDate(date)),
		generateSalesReport: () => dispatch(generateSalesReport()), 
		changeStartTime: (time) => { dispatch(changeStartTime(time)) },
		changeEndTime: (time) => { dispatch(changeEndTime(time)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);

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
		flexDirection: 'column'
	},
	navLinks: {
		marginVertical: 20,
    marginHorizontal: 10
	},
	link: {
		fontSize: 15,
		color: '#333'
	},
	inputStyle: { 
		height: 40,
		borderBottomColor: '#CCC',
		borderBottomWidth: 1,
		width: 200, 
		marginRight: 30
	}
});
