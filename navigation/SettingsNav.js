import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation';
import { linkPermission } from '../functions'
import { connect } from 'react-redux'
import NavigationService from '../NavigationService';

const SettingsNav = (props) => {

  const { userType } = props.pin

  const navLink = (nav, text) => {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => NavigationService.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
  }

  return(
    <ScrollView>
      <View style={styles.navLinks}>
        {linkPermission('Settings_Basic', userType)?navLink('Settings', 'Basic'):null}
        {linkPermission('Settings_Items', userType)?navLink('SettingsItems', 'Items'):null}
        {linkPermission('SettingsPrinter', userType)?navLink('SettingsPrinter', 'Printer'):null}
        {linkPermission('ReportSetup', userType)?navLink('ReportSetup', 'Reports'):null}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  navLinks: {
		marginVertical: 20,
    marginHorizontal: 10
  },
  link: {
		fontSize: 15,
		color: '#333'
	}
})

function mapStateToProps(state) {
	return {
    settings: state.settings,
    pin: state.pin
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNav)
