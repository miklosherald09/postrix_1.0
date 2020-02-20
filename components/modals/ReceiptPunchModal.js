import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { receiptPunchVisible } from '../../actions/receiptActions'
import { refundPunch } from '../../actions/transactionActions'
import { capitalize } from '../../functions'
import { currency } from '../../constants/constants'
import NumberFormat from 'react-number-format'


const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const ReceiptPunchModal = (props) => {
 
  const { receiptPunchVisible, selectedReceiptPunch } = props.receipt
  const { userType } = props.pin

	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
				visible={receiptPunchVisible}
				onRequestClose={() => {  props.receiptPunchVisible(false) 	}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.receiptPunchVisible(false)}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap} >
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.receiptPunchVisible(false) }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>RECEIPT ITEM</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.receiptPunchVisible(false)}/>
								</View>
							</View>
							<View style={styles.content}>
                <View>
                  <View style={{height: 60, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <RefundPunchButton userType={userType} onPress={() => props.refundPunch(selectedReceiptPunch)}/>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                      <Text style={{fontSize: 20, color: (selectedReceiptPunch.refund?'gray':'black') }}>{selectedReceiptPunch.name} {selectedReceiptPunch.refund?' (refunded)':null} </Text>
                      <Text style={{fontSize: 20, color: '#2089dc' }}>{currency + selectedReceiptPunch.sellPrice + ' x ' + selectedReceiptPunch.count}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <NumberFormat 
                      renderText={value => <Text style={{fontSize: 20, color: (selectedReceiptPunch.refund?'gray':'black')}}>{value}</Text>} 
                      fixedDecimalScale={true} 
                      decimalScale={2} 
                      value={selectedReceiptPunch.sellPrice * selectedReceiptPunch.count} 
                      displayType={'text'} 
                      thousandSeparator={true} 
                      prefix={currency} />
                    </View>
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

export class RefundPunchButton extends React.Component{
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
    pin: state.pin
	}
}

function mapDispatchToProps(dispatch) {
	return {
    saveReceiptPunch: () => {
      dispatch(saveReceiptPunch())
      dispatch(receiptPunchVisible(false))
    },
    receiptPunchVisible: (val) => dispatch(receiptPunchVisible(val)),
    saveInput: (name, value) => dispatch(saveInput(name, value)),
    refundPunch: (f) => {
      Alert.alert(
        'Refund Item',  'Are you sure?', [
          { text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () =>dispatch(refundPunch(f))}],
          {cancelable: false}
      )
    },
    deleteTax: (id) => {
      Alert.alert( 'Delete Tax', 'Are you sure?', 
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => dispatch(deleteTax(id)) }
        ],
        { cancelable: false },
      )
    }
	}
}

export const UTypeButton = (props) => {
  return (
    <Button
      type={props.selectedUType == props.title?'solid':'outline'}
      onPress={props.onPress}
      title={capitalize(props.title)}
      titleStyle={{fontSize: 20}}
      containerStyle={{marginRight: 10, borderRadius: 20}}
    />
  )
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
    height: screenHeight - (screenHeight * 0.20 * 2),
    marginLeft: screenWidth * 0.2,
    marginRight: screenWidth * 0.2,
    marginTop: screenHeight * 0.08,
    marginBottom: screenHeight * 0.2,
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
		margin: 20,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptPunchModal)