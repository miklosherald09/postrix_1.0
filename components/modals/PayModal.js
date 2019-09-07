import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon } from 'react-native-elements'
import { 
  payModalInvisible,
  setPayment, 
  PAY_MODAL_VISIBLE, 
  PAY_MODAL_INVISIBLE } from '../../actions/payActions'
import { resetPunched } from '../../actions/punchedActions'
import { RNInput } from '../../components/natives/RNTextInput'
import { payChangeModalVisible, computeChange } from '../../actions/payChangeActions'
import { addTransaction } from '../../actions/transactionActions'
import { printReceipt as printReceiptAction } from '../../actions/receiptActions'
import { togglePrintButton, resetPayment } from '../../actions/payActions'
import { openCashDrawer } from '../../actions/cashDrawerActions'
import formStyles from '../../constants/styles'
import { CustomKeyboard } from '../../components/natives/CustomKeyboard'
import { currency } from '../../constants/constants'
import { CloseButton } from '../../components/Common'
import NumberFormat from 'react-number-format'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PayModal = (props) => {
 
  const { payModalVisible, payment, printReceipt } = props.pay;
  const { total, punched } = props.punched;

	return (
		<View style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={payModalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.payModalInvisible()}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} >
            <View style={{flex: 1, flexDirection: 'column', }}>
							<View style={{height: 50, borderBottomColor: '#CCC', borderBottomWidth: 1, marginBottom: 10}}>
                <CloseButton onPress={ () => props.payModalInvisible() } />
							</View>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1, margin: 10, justifyContent: 'space-between'}}>
                  <View>
                    <View style={{borderBottomColor: '#EEE', borderBottomWidth: 1, paddingVertical: 10}}>
                      <Text style={{alignSelf: 'flex-start', color: '#333', fontSize: 15}}>Payment</Text>
                      <Text style={{alignSelf: 'flex-end', color: '#2CB200', fontSize: 20, position: 'absolute', top: 5}}>
                        <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={payment} displayType={'text'} thousandSeparator={true} prefix={currency} />
                      </Text>
                    </View>
                    <View style={{borderBottomColor: '#EEE', borderBottomWidth: 1, paddingVertical: 10}}>
                      <Text style={{alignSelf: 'flex-start', color: '#333', fontSize: 15}}>Total Amout Due</Text>
                      <Text style={{alignSelf: 'flex-end', color: '#B20000', fontSize: 20, position: 'absolute', top: 5}}>
                        <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={total} displayType={'text'} thousandSeparator={true} prefix={currency} />
                      </Text>
                    </View>
                    <View>
                    </View>
                  </View>
                  <View style={{}}>
                    <Button
                      containerStyle={{width: 60, marginBottom: 10}}
                      icon={
                        <Icon
                          name="print"
                          size={24}
                          color={printReceipt?'white':'#2089dc'}
                        />
                    }
                      iconRight
                      type={printReceipt?'solid':'outline'}
                      onPress={props.togglePrintButton}
                    />
                    <Button onPress={ () => props.submit({payment, total, punched, printReceipt}) } title="Pay"></Button>
                  </View>
								</View>
								<View style={{flex: 1, paddingHorizontal: 20, marginBottom: 10}}>
									<CustomKeyboard onBind={(x) => props.setPayment(x)}/>
								</View>
							</View>
						</View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
		</View>
  );
}

function mapStateToProps(state) {
	return {
    pay: state.pay,
    punched: state.punched,
	}
}

function mapDispatchToProps(dispatch) {
	return {
    togglePrintButton: () => dispatch(togglePrintButton()),
    setModalVisible: () => dispatch({ type: PAY_MODAL_VISIBLE }),
    payModalInvisible: () => dispatch({ type: PAY_MODAL_INVISIBLE }),
    setPayment: (value) => { 
      dispatch(setPayment(value)) 
    },
    submit: (values) => {
      dispatch(payModalInvisible())
      dispatch(resetPayment())
      dispatch(payChangeModalVisible())
      dispatch(addTransaction(values))
      dispatch(computeChange(values))
      dispatch(resetPunched())
      
      if(values.printReceipt == true){
        console.log('trying to print recipt')
        dispatch(printReceiptAction(values))
      }
      
      dispatch(openCashDrawer())
    } 
	}
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
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
  container: {
    // width: screenWidth/2,
    // height: screenHeight/2,

    borderRadius: 10,
    backgroundColor: 'white',
    height: screenHeight - (screenHeight * 0.10 * 2),
    marginLeft: screenWidth * 0.05,
    marginRight: screenWidth * 0.05,
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.05,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PayModal)


