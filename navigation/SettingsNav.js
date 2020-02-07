import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { linkPermission } from '../functions'
import { connect } from 'react-redux'
import NavigationService from '../NavigationService'

const SettingsNav = (props) => {

  const { userType } = props.pin

  const navLink = (nav, text) => {
		return(
			<TouchableOpacity style={{padding: 15}} onPress={() => NavigationService.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
  }

  return(
    <ScrollView>
      <View style={styles.navLinks}>
        {linkPermission('Settings_Basic', userType)?navLink('Settings', 'Receipt'):null}
        {linkPermission('Settings_Items', userType)?navLink('SettingsItems', 'Items'):null}
        {linkPermission('SettingsUsers', userType)?navLink('SettingsUsers', 'Users'):null}
        {linkPermission('SettingsTax', userType)?navLink('SettingsTax', 'Tax'):null}
        {linkPermission('SettingsDiscounts', userType)?navLink('SettingsDiscounts', 'Discounts'):null}
        {linkPermission('SettingsPrinter', userType)?navLink('SettingsPrinter', 'Printer'):null}
        {linkPermission('SettingsBackup', userType)?navLink('SettingsBackup', 'Backup & Recovery'):null}
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
		fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
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
