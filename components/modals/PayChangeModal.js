import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { payChangeModalInvisible } from '../../actions/payChangeActions'
import NumberFormat from 'react-number-format'
import { currency } from '../../constants/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'

const submit = (values, dispatch) => {
  console.log(values)
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PayModal = (props) => {
 
  const { payChangeModalVisible, payChange } = props.payChange;
  
	return (
		<View style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={payChangeModalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.payChangeModalInvisible()}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => props.payChangeModalInvisible()} >
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 30, color: '#666', textAlign: 'center'}}>CHANGE</Text>
                <Text style={{fontSize: 50, color: '#333', textAlign: 'center'}}>
                  <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={payChange} displayType={'text'} thousandSeparator={true} prefix={currency} />
                </Text>
              </View>
              <View style={{flex: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  name="check-circle"
                  size={150}
                  color="#039BE5"
                />
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
    payChange: state.payChange,
	}
}

function mapDispatchToProps(dispatch) {
	return {
    payChangeModalInvisible: () => { dispatch(payChangeModalInvisible()) },
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'PAY_CHANGE_MODAL_FORM',
  onSubmit: submit,
})(PayModal)))

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
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    height: screenHeight - (screenHeight * 0.2 * 2),
    marginLeft: screenWidth * 0.1,
    marginRight: screenWidth * 0.1,
    marginTop: screenHeight * 0.1,
    marginBottom: screenHeight * 0.1,
    padding: 50,
  },
});


