import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { Input } from 'react-native-elements'
import SettingsNav from '../navigation/SettingsNav'
import { updateShopName } from '../actions/settingsActions';
import { deleteAllItems } from '../actions/itemActions'
import { linkPermission } from '../functions'
import NavigationService from '../NavigationService';

const settingsScreen = props => {

  const { userType } = props.pin

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { shopName } = props.settings

  return (
    <View style={styles.wrapper}>
      <View style={styles.topMenu}>
        <View style={styles.topMenuLeft}>
          <MenuButton openMenu={openMenu.bind(this)} color="#333333"/>
        </View>
        <View style={styles.topMenuRight}>
        </View>
      </View>
      <View style={styles.wrap}>
        <View style={styles.leftContent}>
          <SettingsNav />
        </View>
        <View style={styles.rightContent}>
          <View style={styles.container}>
            <Input
              label={"SHOP NAME"}
              type={"default"}
              keyboardType={"default"}
              labelStyle={styles.label}
              containerStyle={{marginTop: 15}}
              inputStyle={{}}
              onChangeText={(text) => {props.updateShopName(text)}}
              value={shopName}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
	return {
    settingsPrinter: state.settingsPrinter,
    settings: state.settings,
    pin: state.pin
	}
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAllItems: () => dispatch(deleteAllItems()),
    updateShopName: (text) => dispatch(updateShopName(text))
  }
}

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
		fontSize: 15,
		color: '#333'
  },
  container: {
    backgroundColor: 'white',
    flex: 1,

  },
  label: {
    fontWeight: 'normal', 
    fontSize: 12, 
    color: '#999'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(settingsScreen);