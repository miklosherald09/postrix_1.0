import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { CloseButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NumberFormat from 'react-number-format'
import { currency } from '../../constants/constants'
import { receiptDetailsModalVisible, receiptModalInvisible, printReceipt, deleteReceiptModalVisible, selectReceiptPunch, receiptPunchVisible } from '../../actions/receiptActions'
import { updateTransactionByID, refundTransaction } from '../../actions/transactionActions'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ReceiptDetailsModal = (props) => {
 
  const { receiptDetailsModalVisible, selected } = props.receipt
  const { SHOP_NAME } = props.settings
  const { userType } = props.pin

  renderDiscount = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <View style={{marginBottom: 10}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20, color: (item.refund?'gray':'black') }}>{item.name} </Text>
              {/* <Text style={{fontSize: 20, color: '#2089dc' }}>{currency + item.sellPrice + ' x ' + item.count}</Text> */}
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <NumberFormat 
              renderText={value => <Text style={{fontSize: 20, color: (item.refund?'gray':'black')}}>{value}</Text>} 
              fixedDecimalScale={true} 
              decimalScale={2} 
              value={item.amount} 
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={currency} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderTax = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <View style={{marginBottom: 10}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20, color: (item.refund?'gray':'black') }}>{item.name} </Text>
              {/* <Text style={{fontSize: 20, color: '#2089dc' }}>{currency + item.sellPrice + ' x ' + item.count}</Text> */}
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <NumberFormat 
              renderText={value => <Text style={{fontSize: 20, color: (item.refund?'gray':'black')}}>{value}</Text>} 
              fixedDecimalScale={true} 
              decimalScale={2} 
              value={item.amount} 
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={currency} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  
	return (
    <View style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={receiptDetailsModalVisible}
        onRequestClose={() => {
          props.receiptDetailsModalVisible(false)
        }}>
        <TouchableOpacity style={styles.touchable} onPress={ () => {props.receiptDetailsModalVisible(false)}}>
          <TouchableOpacity style={styles.container} >
            <View style={styles.wrap} >
              <View style={myStyles.headerPan}>
                <View style={myStyles.headerLeft}>
                </View>
                <View style={myStyles.headerMiddle}>
                <Text style={myStyles.headerModal}>Receipt No. {String(selected.id).padStart(6, '0')}</Text>
                </View>
                <View style={myStyles.headerRight}>
                  <CloseButton onPress={ () => props.receiptDetailsModalVisible(false) }/>
                </View>
              </View>
              <View style={styles.content}>
                {/* <View style={{height: 50, flexDirection: 'row', justifyContent: 'flex-end' }}> */}
                  {/* <PrintButton userType={userType} onPress={() => props.printReceipt(selected)}/>
                  <RefundTransButton userType={userType} onPress={() => props.refundTransaction(selected)}/>
                  <DeleteButton userType={userType} onPress={() => props.deleteReceiptModalVisible(true)}/> */}
                {/* </View> */}
                <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>

                  <View style={{flex: 4, borderRightWidth: 1, borderRightColor: '#CCC'}}>
                    <Text style={styles.companyName}>Discounts</Text>
                    <View style={{textAlign: 'center', padding: 15, }}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={selected.discounts}
                        style={{}}
                        renderItem={this.renderDiscount}
                      />
                    </View>
                    <Text style={styles.companyName}>Taxes</Text>
                    <View style={{textAlign: 'center', padding: 15}}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={selected.taxes}
                        style={{}}
                        renderItem={this.renderTax}
                      />
                    </View>
                  </View>
                  <View style={{flex: 3}}>
                    <Text style={styles.companyName}>Customer</Text>
                    <View style={{flex: 2, textAlign: 'center', padding: 15}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Text style={{fontSize: 20, color: 'gray' }}>Name</Text>
                        </View>
                        <Text style={{fontSize: 20, color: 'gray'}}>{selected.customer.name}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Text style={{fontSize: 20}}>TIN</Text>
                        </View>
                        <Text style={{fontSize: 20}}>{selected.customer.tin}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Text style={{fontSize: 20}}>Address</Text>
                        </View>
                        <Text style={{fontSize: 20}}>{selected.customer.address}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{height: 50, flexDirection: 'row', alignItems: 'flex-end'}}>
                  <View style={{flex: 1}}>
                    <Text style={myStyles.header2}> TOTAL:</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
                    <NumberFormat 
                      renderText={value => <Text style={myStyles.header2}>{value}</Text>} 
                      fixedDecimalScale={true} 
                      decimalScale={2} 
                      value={selected.total} 
                      displayType={'text'} 
                      thousandSeparator={true} 
                      prefix={currency} />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
	);
}

export class DeleteButton extends React.Component{

  render(){
    return (
      (this.props.userType == 'ROOT' || this.props.userType == 'ADMIN')?
      <Button
        onPress={this.props.onPress} style={styles.opacity}
        containerStyle={{}}
        type="clear"
        titleStyle={{color: '#333', marginLeft: 5}}
        icon={
          <Icon 
            name="trash-alt"
            size={30}
            color="grey"
          />
        }
      />:null
    )
  }
}

export class PrintButton extends React.Component{

  render(){
    return (
      (this.props.userType == 'ROOT' || this.props.userType == 'ADMIN')?
      <Button
        onPress={this.props.onPress} style={styles.opacity}
        containerStyle={{}}
        type="clear"
        titleStyle={{color: '#333', marginLeft: 5}}
        icon={
          <Icon 
            name="print"
            size={30}
            color="#2089dc"
          />
        }
      />:null
    )
  }
}

export class RefundTransButton extends React.Component{

  render(){
    return (
      (this.props.userType == 'ROOT' || this.props.userType == 'ADMIN')?
      <Button
        onPress={this.props.onPress} style={styles.opacity}
        containerStyle={{}}
        type="clear"
        titleStyle={{color: '#333', marginLeft: 5}}
        icon={
          <Icon 
            name="undo-alt"
            size={30}
            color="#2089dc"
          />
        }
      />:null
    )
  }
}

function mapStateToProps(state) {
	return {
    receipt: state.receipt,
    settings: state.settings,
    pin: state.pin
	}
}

function mapDispatchToProps(dispatch) {
	return {
    receiptModalInvisible: () => dispatch(receiptModalInvisible()),
    receiptDetailsModalVisible: (v) => dispatch(receiptDetailsModalVisible(v)),
    deleteReceiptModalVisible: (v) => { 
      dispatch(deleteReceiptModalVisible(v))
    },
    printReceipt: (t) => {
      dispatch(printReceipt(t)),
      t.printed = 1,
      dispatch(updateTransactionByID(t))
    },
    selectReceiptPunch: (p) => {
      dispatch(selectReceiptPunch(p)),
      dispatch(receiptPunchVisible(true))
    },
    refundTransaction: (t) => {
      Alert.alert(
        'Refund Transaction',  'Are you sure?', [
          { text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => dispatch(refundTransaction(t))}],
          {cancelable: false}
      )
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    borderRadius: 10,
  },
  wrap: {
		flex: 1,
    justifyContent: 'center',
  },
  touchable: {
    flex: 1, 
    backgroundColor: 'blue',
  },
  container: {
    // width: screenWidth/2,
    // height: screenHeight/2,
    borderRadius: 10,
    backgroundColor: 'white',
    height: screenHeight - (screenHeight * 0.10 * 2),
    marginLeft: screenWidth * 0.2,
    marginRight: screenWidth * 0.2,
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.05,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
  label: {
    fontWeight: 'normal', 
    fontSize: 20, 
    color: '#999'
  },
  button: {
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
	containerStyle: {
		paddingHorizontal: 0,
	},
	closeButtonPan: {
		flex: 1,
		padding: 14,
		height: 60,
		alignSelf: 'flex-end',
    width: 50,
	},
	modalTitle: {
		flex: 1,
		height: 60,
		justifyContent: 'center',
		marginLeft: 10
	},
	content: {
		flex: 1,
		margin: 15,
  },
  invalid: {
    marginLeft: 10,
    color: 'red',
    fontSize: 20,
  },
  warning: {
    marginLeft: 10,
    color: 'red',
    fontSize: 20,
  },
  submitPan: {
    flex: 1,
    backgroundColor: 'blue'
  },
  touchable: {
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
  companyName: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
    marginBottom: 10,
    marginLeft: 13
    // textAlign: 'center'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptDetailsModal);

