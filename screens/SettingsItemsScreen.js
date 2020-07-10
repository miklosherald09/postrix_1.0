import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Image, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { updateGoogleSheetUrl, updateGoogleSheetUrlCsv } from '../actions/settingsActions';
import { deleteAllItems } from '../actions/itemActions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SettingsNav from '../navigation/SettingsNav'
import { syncGoogleSheet } from '../actions/itemActions'
import myStyles from '../constants/styles'

const SettingsItemsScreen = props => {

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { GOOGLE_SHEET_URL_CSV } = props.settings
  const { syncingGoogleSheet, syncedItem, removingUnusedItem, syncDuplicateItems } = props.items

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
            <ScrollView>
              <View style={{backgroundColor: 'white', margin: 10, padding: 10}}>
                <View>
                  <Text style={{...myStyles.header3, margin: 10}}>GOOGLE SHEET CSV</Text>
                  <View style={{flexDirection: 'column'}}>
                    <TextInput
                      style={{fontSize: 20, flex: 5, marginTop: 5, borderBottomWidth: 1, borderColor: '#999'}}
                      placeholder="enter published google sheet csv link"
                      onChangeText={(text) => props.updateGoogleSheetUrlCsv(text)}
                      defaultValue={GOOGLE_SHEET_URL_CSV.value}
                    />
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                      { SyncItemButton(props) }
                      { EraseAllItemsButton(props) }
                    </View>
                  </View>
                  <View>
                    <Text style={{marginTop: 10, fontSize: 20, marginLeft: 5, color: 'green'}}>{syncingGoogleSheet?'synching...'+(syncedItem.title || ''): ''}</Text>
                    <Text style={{marginTop: 10, fontSize: 20, marginLeft: 5, color: 'green'}}>{removingUnusedItem?'removing unused item...': ''}</Text>
                  </View>
                  {
                    syncDuplicateItems.length?
                      <Text style={{fontSize: 20, color: 'red'}}>Duplicate item IDs {syncDuplicateItems.join(', ')}</Text>:null
                  }
                </View>
              </View>
              {/* <View style={{backgroundColor: 'white', margin: 10, padding: 10}}>
              </View> */}
              <View style={{ backgroundColor: 'white', margin: 10, padding: 10}}>
                <Text style={{...myStyles.header3, margin: 10}}>STEPS TO LINK TO GOOGLE SHEET</Text>
                <Image style={{marginTop: -200, width: '100%', resizeMode: 'contain'}} source={require('../assets/syncitem-steps.jpg')} />
              </View>
            </ScrollView>
          </View>
      </View>
    </View>
  );
}

const EraseAllItemsButton = (props) => {
  
  return (
    <TouchableOpacity onPress={() => props.deleteAllItems()}>
      <Icon
        style={{marginHorizontal: 10, marginVertical: 10}}
        name="trash"
        size={32}
        color="#CCC"
      />
    </TouchableOpacity>
  )
}

const SyncItemButton = (props) => {
  
  return (
    <TouchableOpacity onPress={() => props.syncGoogleSheet()}>
      <Icon
        style={{marginVertical: 10, marginHorizontal: 10}}
        name="sync-alt"
        size={32}
        color="#2B78FE"
      />
    </TouchableOpacity>
  )
}

function mapStateToProps(state) {
	return {
    settingsPrinter: state.settingsPrinter,
    settings: state.settings,
    items: state.items
	}
}

function mapDispatchToProps(dispatch) {
  return {
    updateGoogleSheetUrl: (text) => dispatch(updateGoogleSheetUrl(text)),
    updateGoogleSheetUrlCsv: (text) => dispatch(updateGoogleSheetUrlCsv(text)),
    deleteAllItems: () => {
      Alert.alert(
        'Delete All Items',  'Are you sure?', [{
            text: 'Cancel',
            onPress: () => console.log('Delete All cancelled'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => dispatch(deleteAllItems())}],
        {cancelable: false},
    )},
    syncGoogleSheet: () => dispatch(syncGoogleSheet()),
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
  buttonPanLeft: {
    flex: 1,
    flexWrap: 'wrap', 
    justifyContent : 'flex-start',
    flexDirection:'row',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsItemsScreen);
