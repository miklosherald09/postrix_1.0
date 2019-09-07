import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { updateGoogleSheetUrl, updateGoogleSheetUrlCsv } from '../actions/settingsActions';
import { deleteAllItems } from '../actions/itemActions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SettingsNav from '../navigation/SettingsNav'
import { syncGoogleSheet } from '../actions/itemActions'


const SettingsItemsScreen = props => {

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { googleSheetUrl, googleSheetUrlCsv } = props.settings
  const { searchText, syncingGoogleSheet, itemsCount,  } = props.items

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
         
          <View style={{backgroundColor: 'white', margin: 10, padding: 10}}>
            {/* <Text>Google Sheets</Text>
            <TextInput 
              style={{marginTop: 5, borderWidth: 1, borderColor: '#CCC'}}
              placeholder="enter published google sheet link" 
              onChangeText={(text) => props.updateGoogleSheetUrl(text)}
              value={googleSheetUrl} /> */}
            
            <View>
              <Text style={{}}>Google Sheets CSV</Text>
              <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{flex: 5, marginTop: 5, borderWidth: 1, borderColor: '#CCC'}}
                placeholder="enter published google sheet csv link"
                onChangeText={(text) => props.updateGoogleSheetUrlCsv(text)}
                value={googleSheetUrlCsv} />
                <View style={{flex: 1, alignItems: 'center'}}>
                  { SyncItemButton(props) }
                </View>
              </View>
              <View>
                <Text style={{marginTop: 10, marginLeft: 5}}>{syncingGoogleSheet?'synching...':''}</Text>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: 'white', margin: 10, padding: 10}}>
            <Text>Warning! This will delete all item records</Text>
            { EraseAllItemsButton(props) }
          </View>
        </View>
      </View>
    </View>
  );
}

const EraseAllItemsButton = (props) => {
  
  return (
    <TouchableOpacity onPress={() => props.deleteAllItems()}>
      <Icon
        style={{marginHorizontal: 10, marginVertical: 5}}
        name="trash"
        size={30}
        color="#666"
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
        size={35}
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
    deleteAllItems: () => dispatch(deleteAllItems()),
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
		fontSize: 15,
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
