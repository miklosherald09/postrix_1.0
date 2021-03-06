import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Button } from 'react-native-elements'
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
import ChargeDiscountModal from '../components/modals/ChargeDiscountModal'
import TagCustomerModal from '../components/modals/TagCustomerModal'
import { AddShelveButton, ChargeButton, ShelveButton, ItemSearchButton, PayButton, TaxList, DiscountList, DiscountButton, CustomerButton } from './HomeScreenComponents'
import { CONTENT_SHELVES, CONTENT_CHARGE, changeActiveContent, taxDetailsToggle } from '../actions/homeActions'
import { addModalVisible, getShelveItems, selectShelve, deleteShelve, getShelveItemsRefresh, shelveModalVisible } from '../actions/shelvesActions'
import { tagCustomerModalVisible } from '../actions/customerActions'
import { modalVisible } from '../actions/itemSearchActions'
import { chargeDiscountModalVisible } from '../actions/discountActions'
import { payModalVisible } from '../actions/payActions'
import { currency } from '../constants/constants'
import NumberFormat from 'react-number-format'
import { barcodeSeachItem } from '../actions/barcodeSearchActions'
import { getCharges } from '../actions/chargeActions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { computeTotal } from '../functions'


const HomeScreen = props => {

  const { total, punched  } = props.punched
  const { shelves, activeShelve } = props.shelves
  const { activeContent, taxDetailsVisible } = props.home
  const { taxes, vatableAmount } = props.tax
  const { discountCharges } = props.discount
  const { selectedTagCustomer } = props.customer

  searchText = '' 
  timeout = null

  openMenu = () => {
		props.navigation.openDrawer()
  }

  return (
    <View style={styles.container}>
      <View style={{position:'absolute', marginTop: -50, width: 100, height: 20, backgroundColor: 'blue'}}>
        <Button title={'.'} color="white"  ref={component => this._cleverBtn = component}></Button>
      </View>
      <View style={{flex: 2, backgroundColor: '#CACAD9'}}>
        <View style={styles.leftTopBar}>
          <View style={{flexDirection: 'row'}} justifyContent="space-between" >
              <MenuButton openMenu={this.openMenu.bind(this)} color="#333333"/>
              <ItemSearchButton onPress={(e) => props.modalVisible(e)}/>
          </View>
        </View>
        <View style={styles.itemBoxContainer}>
          { activeContent == CONTENT_SHELVES?<ShelveItemsList />:<ChargeList /> }
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
          <View style={{flex: 1, flexDirection: 'row', marginTop: 3}}>
            <CustomerButton onPress={() => props.tagCustomerModalVisible(true)} />
            <Text style={{fontSize: 20, marginTop: 10}}>{selectedTagCustomer.name.slice(0, 10)}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 3}}>
            <DiscountButton onPress={() => props.chargeDiscountModalVisible(true)} />
            <ChargeButton onPress={() => props.selectCharge(CONTENT_CHARGE)} />
          </View>
        </View>
        <View style={{flex: 3, padding: 10}}>
          <PunchedItemList />
        </View>
        <View style={{padding: 10}}>
          <DiscountList discounts={discountCharges} />
        </View>
        { taxDetailsVisible?
          <View>
            
            <TaxList taxes={taxes} vatableAmount={vatableAmount}/>
          </View>:null }
        <View style={styles.rightBottomBar}>
          <View style={styles.customButtonContainer}>
            <View>
              <TaxInfoButton onPress={() => props.taxDetailsToggle()}/>
            </View>
            <View>
            </View>
            <View style={styles.punchedButtonPan}>
              <Text style={styles.total}>
                <NumberFormat 
                  renderText={value => <Text style={{fontSize: 40}}>{value}</Text>} 
                  fixedDecimalScale={true} 
                  decimalScale={2} 
                  value={computeTotal(punched, discountCharges)} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={currency} />
              </Text>
            </View>
          </View>
          <View style={{height: 85}}>
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
        <ChargeDiscountModal />
        <TagCustomerModal />
      </View>
    </View>
  );
}

const TaxInfoButton = ({onPress}) => {
  return (
    <Button
      onPress={onPress}
      type="clear"
      containerStyle={{padding: 10}}
      icon={
        <Icon
          name={'info-circle'}
          size={35}
          color="gray"
        />
      }
    />
  )
}

function mapStateToProps(state) {
	return {
    punched: state.punched,
    shelves: state.shelves,
    home: state.home,
    settingsPrinter: state.settingsPrinter,
    tax: state.tax,
    discount: state.discount,
    customer: state.customer
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
    selectCharge: (val) => {
      dispatch(selectShelve({id: null}))
      dispatch(changeActiveContent(val))
      dispatch(getCharges())
    },
    modalVisible: () => { dispatch(modalVisible()) },
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
    shelveModalVisible: (v) => dispatch(shelveModalVisible(v)),
    taxDetailsToggle: () => dispatch(taxDetailsToggle()),
    chargeDiscountModalVisible: (v) => dispatch(chargeDiscountModalVisible(v)),
    tagCustomerModalVisible: (v) => dispatch(tagCustomerModalVisible(v))
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
    flexDirection: 'row',
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
    height: 60,
  },
  rightBottomBar: {
    backgroundColor: 'white',
    height: 150,
  },
  text: {
    fontSize: 30
  },
  total: {
    marginTop: 10,
    marginRight: 10,
    fontSize: 40,
    color: '#333',
    fontWeight: 'bold'
  },
  punchedButtonPan: {
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'right',
    flexDirection: 'row'
  },
  taxInfoPan: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'flex-end',
    marginTop: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
