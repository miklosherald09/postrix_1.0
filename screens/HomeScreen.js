import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Alert, AppState, Keyboard, Button, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import PayModal from '../components/modals/PayModal'
import PunchedItemList from '../components/PunchedItemList'
import ShelveItemsList  from '../components/ShelveItemsList'
import ChargeList from '../components/ChargeList'
import ItemSearchModal from '../components/modals/ItemSearchModal'
import PayChangeModal from '../components/modals/PayChangeModal'
import AddShelveModal from '../components/modals/AddShelveModal'
import ShelveModal from '../components/modals/ShelveModal'
import PunchItemModal from '../components/modals/PunchItemModal'
import AddShelveItemsModal from '../components/modals/AddShelveItemsModal'
import ItemColorsModal from '../components/modals/ItemColorsModal'
import SaveChargeModal from '../components/modals/SaveChargeModal'
import { AddShelveButton, ShelveAllButton, ChargeButton, ShelveButton, ItemSearchButton, PayButton } from './HomeScreenComponents'
import { CONTENT_SHELVES, CONTENT_CHARGE, changeActiveContent } from '../actions/homeActions'
import { addModalVisible, getShelveItems, selectShelve, deleteShelve, getShelveItemsRefresh, shelveModalVisible } from '../actions/shelvesActions'
import { modalVisible } from '../actions/itemSearchActions'
import { payModalVisible } from '../actions/payActions'
import { currency } from '../constants/constants'
import NumberFormat from 'react-number-format'
import KeyEvent from 'react-native-keyevent'
import { barcodeSeachItem } from '../actions/barcodeSearchActions'
import { getCharges } from '../actions/chargeActions'
import { ListItem, Icon } from 'react-native-elements'
import {  Avatar } from 'react-native-elements'


const HomeScreen = props => {

  const { total } = props.punched
  const { shelves, activeShelve } = props.shelves
  const { activeContent } = props.home
  searchText = '' 
  timeout = null

  useEffect(() => {
    KeyEvent.onKeyDownListener((keyEvent) => {

      if(keyEvent.keyCode != 66)
        searchText += keyEvent.pressedKey

      clearTimeout(timeout);

      timeout = setTimeout(function () {
        props.barcodeSeachItem(searchText)
        searchText = ''
      }, 500)

    });
    Keyboard.removeAllListeners('keyDown')
  
  }, []);

  openMenu = () => {
		props.navigation.openDrawer()
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 2, backgroundColor: '#CACAD9'}}>
        <View style={styles.leftTopBar}>
          <View style={{flexDirection: 'row'}} >
            <View style={{flex: 2}}>
              <MenuButton openMenu={this.openMenu.bind(this)} color="#333333"/>
            </View>
            <View style={{flex: 4, alignItems: 'flex-start'}}>
              <View style={{position:'absolute', marginTop: -50, width: 100, height: 20, backgroundColor: 'blue'}}>
                <Button title={'.'} color="white"  ref={component => this._cleverBtn = component}></Button>
              </View>
              <ItemSearchButton onPress={(e) => props.modalVisible(e)}/>
            </View>
            <View style={{flex: 2}}>
              {/* <BarcodeSearch /> */}
            </View>
          </View>
        </View>
        <View style={styles.itemBoxContainer}>
          {
            activeContent == CONTENT_SHELVES?<ShelveItemsList />:<ChargeList />
          }
        </View>
        <View style={styles.leftBottomBar}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {
              shelves.map((v, i) => {
                return (
                <ShelveButton
                  key={i}
                  activeShelve={activeShelve}
                  shelve={v}
                  onPress={() => props.selectShelve(v)}
                  onLongPress={ () => { props.shelveModalVisible(v) } } >
                </ShelveButton>)
              })
            }
            <AddShelveButton onPress={() => props.shelveModalVisible({})}/>
          </View>
        </View>
      </View>
      <View style={{flex: 1, borderLeftColor: 'black'}}>
        <View style={styles.rightTopBar}>
          <View style={{alignSelf: 'flex-end', marginTop: 3}}>
            <ChargeButton onPress={() => props.changeActiveContent(CONTENT_CHARGE)} />
          </View>
        </View>
        <View style={{flex: 1, padding: 10}}>
          
           
          <PunchedItemList />
        </View>
        <View style={styles.rightBottomBar}>
          <View style={styles.customButtonContainer}>
            <View style={{flex: 1}}>
            </View>
            <View style={styles.punchedButtonPan}>
              <Text style={styles.total}>
                <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={total} displayType={'text'} thousandSeparator={true} prefix={currency} />
              </Text>
            </View>
          </View>
          <View style={{height: 50}}>
            <PayButton onPress={() => props.payModalVisible()} />
          </View>
        </View>
      </View>
      <View>
        <PayModal />
        <PayChangeModal />
        <ItemSearchModal />
        <AddShelveModal />
        <AddShelveItemsModal />
        <PunchItemModal />
        <ItemColorsModal />
        <ShelveModal />
        <SaveChargeModal />
      </View>
    </View>
  );
}

function mapStateToProps(state) {
	return {
    punched: state.punched,
    shelves: state.shelves,
    home: state.home
	}
}

function mapDispatchToProps(dispatch) {
  return {
    barcodeSeachItem: (text) => { dispatch(barcodeSeachItem(text)) },
    addModalVisible: (e) => dispatch(addModalVisible()),
    getShelves: () => dispatch(getShelves()),
    selectShelve: (shelve) => {
      dispatch(selectShelve(shelve))
      dispatch(getShelveItemsRefresh())
      dispatch(getShelveItems(shelve))
      dispatch(changeActiveContent(CONTENT_SHELVES))
    },
    changeActiveContent: (val) => {
      dispatch(changeActiveContent(val))
      dispatch(getCharges())
    },
    modalVisible: () => {
      dispatch(modalVisible())
    },
    payModalVisible: () => dispatch(payModalVisible()),
    showItemColorsModal: () => dispatch(showItemColorsModal()), 
    deleteShelve: (shelve) => {
      Alert.alert('Delete Shelve', 'Are you sure?', [{
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => dispatch(deleteShelve(shelve))
      }],
      {cancelable: false} )
    },
    shelveModalVisible: (v) => dispatch(shelveModalVisible(v))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
		flexDirection: 'row',
	},
	itemBoxContainer: {
		flex: 1,
		// flexDirection: 'row',
		backgroundColor: null
	},
	customButtonContainer: {
    flex: 1,
    flexDirection: 'row',
	},
  leftTopBar: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  rightTopBar: {
		width: '100%',
    height: 60,
    borderLeftColor: '#CCCCCC',
    backgroundColor: 'white',
		borderLeftWidth: 1,
		borderBottomColor: '#CCCCCC',
		borderBottomWidth: 1,
  },
  leftBottomBar: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: 'white',
    height: 50,
  },
  rightBottomBar: {
    backgroundColor: 'white',
    height: 100,

  },
  text: {
    fontSize: 30
  },
  total: {
    marginTop: 10,
    marginRight: 10,
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold'
  },
  punchedButtonPan: {
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'right',
    flexDirection: 'row'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
