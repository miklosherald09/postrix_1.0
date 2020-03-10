import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { linkPermission } from '../functions'
import { connect } from 'react-redux'
import NavigationService from '../NavigationService'


const ReportsNav = (props) => {

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
        {linkPermission('Settings_Basic', userType)?navLink('Reports', 'Sales'):null}
        {linkPermission('ReportTax', userType)?navLink('ReportTax', 'Taxes'):null}
        {linkPermission('ReportRefund', userType)?navLink('ReportRefund', 'Refunds'):null}
        {linkPermission('ReportDiscount', userType)?navLink('ReportDiscount', 'Discounts'):null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportsNav)
