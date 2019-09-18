import React from 'react';
import {
	View, 
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Alert
} from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { signOut } from '../actions/pinActions'
import { linkPermission } from '../functions'

const MenuDrawer = (props) => {

	const { userType } = props.pin

	const navLink = (nav, text, icon, size) => {
		return (
			<Button
				onPress={() => props.navigation.navigate(nav)}
				type="clear"
				titleStyle={{ marginLeft: 10, fontSize: 15, color: 'white'}}
				iconContainerStyle={{paddingTop: 3}}
				buttonStyle={{justifyContent: 'flex-start', marginBottom: 10}}
				icon={
					<Icon
						name={icon}
						size={size}
						color="white"
					/>
				}
				title={text}
			/>
		)
	}

	return(
		<View style={{flex: 1}}>
		<TouchableOpacity activeOpacity={1} style={styles.drawerTransparent} onPress={() => props.navigation.toggleDrawer()}>
			<TouchableOpacity activeOpacity={1} style={styles.drawer}>
			<View style={styles.headerBox}>
				{/* <Text style={styles.header}>image</Text> */}
				<Image
					style={{width: 150, height: 56,  marginLeft: 7, marginTop: 2, borderWidth: 2 }}
					resizeMode="contain"
					source={require('../assets/postrix-logo2.png')}
				/>
			</View>
			<View style={{flex: 5}}>
				<ScrollView>
					<View style={styles.links}>
						{linkPermission('Home', userType)?navLink('Home', 'Sales', 'pen-square', 26):null}
						{linkPermission('Items', userType)?navLink('Items', 'Items', 'boxes', 26):null}
						{linkPermission('Transactions', userType)?navLink('Transactions', 'Transactions', 'cheese', 24):null}
						{linkPermission('Reports', userType)?navLink('Reports', 'Reports', 'chart-pie', 24):null}
						{linkPermission('Settings', userType)?navLink('Settings', 'Settings', 'cog', 24):null}
					</View>
				</ScrollView>
			</View>
			<View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
				{signOutButton(props)}
				<Text style={{marginLeft: 8, fontSize: 10}}>{userType} @Postrix v1.0</Text>
			</View>
			</TouchableOpacity>
		</TouchableOpacity>
		</View>
	)
}

function mapStateToProps(state) {
	return {
    pin: state.pin,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => { dispatch(signOut()) },
  }
}


const signOutButton = (props) => {
	return (
    <Button
			type="clear"
			titleStyle={{ marginLeft: 10, fontSize: 14, color: 'white'}}
			iconContainerStyle={{}}
			buttonStyle={{justifyContent: 'flex-start'}}
			icon={
				<Icon
					name="sign-out-alt"
					size={24}
					color="white"
				/>
			}
			title="Sign-out"
			onPress={// Works on both iOS and Android
				() => Alert.alert(
					'Logout',
					'Are you sure?',
					[
						// {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
						{
							text: 'Cancel',
							onPress: () => console.log('logout cancelled'),
							style: 'cancel',
						},
						{text: 'OK', onPress: () => props.signOut()},
					],
					{cancelable: false},
				)}
		/>
  )
}

const styles = StyleSheet.create({
  drawer: {
    width: 280,
		backgroundColor: '#039BE5',
		// backgroundColor: 'skyblue',
    height: '100%',
    padding: 10,
  },
  drawerTransparent: {
		// backgroundColor: 'rgba(0,0,0,0.5)',
		backgroundColor: 'transparent',
		// backgroundColor: 'pink',
    flex: 1,
  },
  headerBox: {
		flex: 1,
		// backgroundColor: 'black'
  },
  header: {
    fontSize: 28,
    color: 'white',
  },
  row: {

  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26,
    color: 'purple',
  },
  TouchableHighlight: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
	links: {
		flex: 1,
		// backgroundColor: 'yellow',
		paddingTop: 10,
		paddingBottom: 450,
	},

})

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer)