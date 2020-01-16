import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Modal, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Button } from 'react-native-elements'
import { CloseButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NumberFormat from 'react-number-format'
import { currency } from '../../constants/constants'
import { receiptModalInvisible, printReceipt, deleteReceiptModalVisible } from '../../actions/receiptActions'
import { updateTransactionByID } from '../../actions/transactionActions'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ReceiptModal = (props) => {
 
  const { receiptModalVisible, selected } = props.receipt
  const { shopName } = props.settings
  const { userType } = props.pin

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        containerStyle={{padding: 5}}
        title={item.name}
        titleStyle={{fontSize: 20}}
        subtitle={currency + item.sellPrice + ' x ' + item.count}
        subtitleStyle={{fontSize: 20, color: '#2089dc'}}
        rightTitle={<NumberFormat 
          renderText={value => <Text style={{fontSize: 30, color: '#333'}}>{value}</Text>} 
          fixedDecimalScale={true} 
          decimalScale={2} 
          value={item.sellPrice * item.count} 
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={currency} />}
        rightTitleStyle={{fontSize: 15, color: '#333', }}
      />
    )
  }
  
	return (
    <View style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={receiptModalVisible}
        onRequestClose={() => {
          props.receiptModalInvisible()
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.receiptModalInvisible()}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} >
            <View style={styles.wrap} >
              <View style={myStyles.headerPan}>
                <View style={myStyles.headerLeft}>
                  <CloseButton onPress={ () => props.receiptModalInvisible() }/>
                </View>
                <View style={myStyles.headerMiddle}>
      <Text style={myStyles.headerModal}>{selected.printed} - Receipt No. {String(selected.id).padStart(6, '0')}</Text>
                </View>
                <View style={myStyles.headerRight}>
                  {/* <SaveButton userType={userType} onPress={() => props.saveCharge()}/> */}
                </View>
              </View>
              <View style={styles.content}>
                <View style={{height: 30, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <DeleteButton userType={userType} onPress={() => props.deleteReceiptModalVisible(true)}/>
                  <PrintButton userType={userType} onPress={() => props.printReceipt(selected)}/>
                </View>
                <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                  <View style={{flex: 1, textAlign: 'center'}}>
                    <Text style={styles.companyName}>{shopName}</Text>
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={selected.punched}
                      style={{flex: 1}}
                      renderItem={this.renderItem}
                    />
                  </View>
                </View>
                <View style={{height: 50, flexDirection: 'row', alignItems: 'flex-end'}}>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 22}}> TOTAL:</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
                    <NumberFormat 
                      renderText={value => <Text style={{fontSize: 22}}>{value}</Text>} 
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
            name="times-circle"
            size={30}
            color="#FF0000"
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
    deleteReceiptModalVisible: (visible) => { 
      dispatch(deleteReceiptModalVisible(visible))
    },
    printReceipt: (transaction) => {
      dispatch(printReceipt(transaction)),
      transaction.printed = 1,
      dispatch(updateTransactionByID(transaction))
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
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  container: {
    // width: screenWidth/2,
    // height: screenHeight/2,
    borderRadius: 10,
    backgroundColor: 'white',
    height: screenHeight - (screenHeight * 0.10 * 2),
    marginLeft: screenWidth * 0.30,
    marginRight: screenWidth * 0.30,
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
    textAlign: 'center'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptModal);

