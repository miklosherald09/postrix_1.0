import React, { useEffect } from 'react'
import { StyleSheet, View, Text,  } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { Button, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SettingsNav from '../navigation/SettingsNav'
import { settingsReceiptModalVisible, editReceiptSettings, toggleEnabledReceiptSettings, updateShopName, updateReceiptHeader, updateReceiptFooter } from '../actions/settingsActions'
import { deleteAllItems } from '../actions/itemActions'
import { Switch } from 'react-native-gesture-handler'
import SettingsReceiptModal from '../components/modals/SettingsReceiptModal'


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
   
  const settingsArr = [
    {label: 'Shop Name', ...SHOP_NAME},
    {label: 'Header', ...RECEIPT_HEADER},
    {label: 'Footer', ...RECEIPT_FOOTER}
  ]


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
            {
              settingsArr.map((v, i) => {
                return (
                  <View key={'ss'+i}>
                    <View style={{padding: 10, flexDirection: 'row',}}>
                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 22, color: '#999', marginTop: 7, marginLeft: 10}}>{v.label}</Text>
                        <Text numberOfLines={5}  ellipsizeMode={'tail'} style={{fontSize: 22, color: '#333', marginTop: 7, marginLeft: 10}}>{v.value}</Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <View style={{flexDirection: 'column'}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{marginTop: 10, marginRight: 10, fontSize: 20, color: '#999'}}>enabled</Text>
                            <Switch
                              onValueChange={(enabled) => props.toggleEnabledReceiptSettings(v, enabled)}
                              value={v.enabled?true:false}
                              style={{ marginTop: 10, transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                            />
                          </View>
                          <View style={{alignItems: 'flex-end'}}>
                            <Button
                              containerStyle={{marginTop: 50}}
                              onPress={() => props.editReceiptSettings(v)}
                              type="clear"
                              icon={
                                <Icon
                                  name="edit"
                                  size={25}
                                  color={'#333'}
                                />
                              }
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <Divider style={{}}/>
                  </View>
                )
              })
            }
          </View>

          {/* <View style={styles.container}>
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
          </View> */}
        </View>
      </View>
      <SettingsReceiptModal />
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
    updateReceiptFooter: (text) => dispatch(updateReceiptFooter(text)),

    editReceiptSettings: (v) => {
      dispatch(settingsReceiptModalVisible(true))
      dispatch(editReceiptSettings(v))
    },
    toggleEnabledReceiptSettings: (v, e) => dispatch(toggleEnabledReceiptSettings(v, e))
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
  },
  label: {
    fontWeight: 'normal', 
    fontSize: 20, 
    color: '#999'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(settingsScreen)