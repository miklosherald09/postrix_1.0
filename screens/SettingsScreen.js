import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { Input } from 'react-native-elements'
import SettingsNav from '../navigation/SettingsNav'
import { updateShopName, updateReceiptHeader, updateReceiptFooter } from '../actions/settingsActions'
import { deleteAllItems } from '../actions/itemActions'

const settingsScreen = props => {

  const { userType } = props.pin

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { SHOP_NAME, RECEIPT_HEADER, RECEIPT_FOOTER } = props.settings

  timeout = null

  const updateShopName = (text) => {
    clearTimeout(timeout);
    console.log('updateShopName1')
    timeout = setTimeout(function () {
      console.log('updateShopName2')
      props.updateShopName(text)
    }, 500)
  }

  timeout = null
  
  const updateReceiptHeader = (text) => {
    clearTimeout(timeout);
    console.log('updateReceiptHeader1')
    timeout = setTimeout(function () {
      console.log('updateReceiptHeader2')
      props.updateReceiptHeader(text)
    }, 500)
  }

  timeout = null

  const updateReceiptFooter = (text) => {
    clearTimeout(timeout);
    console.log('updateReceiptFooter1')
    timeout = setTimeout(function () {
      console.log('updateReceiptFooter2')
      props.updateReceiptFooter(text)
    }, 500)
  }

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
              label={"Shop name"}
              type={"default"}
              keyboardType={"default"}
              labelStyle={styles.label}
              containerStyle={{marginTop: 15, marginBottom: 50}}
              inputStyle={{}}
              onChangeText={(text) => {updateShopName(text)}} 
              defaultValue={SHOP_NAME}
            />
            <Input
              label={"Header"}
              type={"default"}
              keyboardType={"default"}
              labelStyle={styles.label}
              numberOfLines={5}
              multiline
              containerStyle={{ marginBottom: 50, paddingTop: 0}}
              inputStyle={{}}
              onChangeText={(text) => {updateReceiptHeader(text)}}
              defaultValue={RECEIPT_HEADER}
            />
            <Input
              label={"Footer"}
              type={"default"}
              keyboardType={"default"}
              labelStyle={styles.label}
              numberOfLines={5}
              multiline
              containerStyle={{marginTop: 15}}
              inputStyle={{}}
              onChangeText={(text) => {updateReceiptFooter(text)}}
              defaultValue={RECEIPT_FOOTER}
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
    updateShopName: (text) => dispatch(updateShopName(text)),
    updateReceiptHeader: (text) => dispatch(updateReceiptHeader(text)),
    updateReceiptFooter: (text) => dispatch(updateReceiptFooter(text))
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
		fontSize: 20,
		color: '#333'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
  },
  label: {
    fontWeight: 'normal', 
    fontSize: 20, 
    color: '#999'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(settingsScreen)