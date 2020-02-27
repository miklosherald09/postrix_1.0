import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableHighlight, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Button, Input } from 'react-native-elements'
import { CloseButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NumberFormat from 'react-number-format'
import { currency } from '../../constants/constants'
import { receiptModalInvisible, printReceipt, deleteReceiptModalVisible, deleteReceipt } from '../../actions/receiptActions'
import { deleteTransaction } from '../../actions/transactionActions'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DeleteReceiptModal = (props) => {
 
  const { receiptModalVisible, selected, deleteReceiptModalVisible } = props.receipt
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
        subtitle={'x' + item.count}
        subtitleStyle={{fontSize: 20}}
        rightTitle={String(item.accruePrice)}
        rightTitleStyle={{fontSize: 20}}
      />
    )
  };
  
	return (
    <View style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={deleteReceiptModalVisible}
        onRequestClose={() => {
          props.deleteReceiptModalVisible(false)
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.deleteReceiptModalVisible(false)}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} >
            <View style={myStyles.wrap}>
              <View style={myStyles.headerPan}>
                <View style={myStyles.headerLeft}>
                  <CloseButton onPress={ () => props.deleteReceiptModalVisible(false) }/>
                </View>
                <View style={myStyles.headerMiddle}>
                  <Text style={myStyles.headerModal}>RECEIPT - {selected.id}</Text>
                </View>
                <View style={myStyles.headerRight}>
                  {/* <SaveButton userType={userType} onPress={() => props.saveCharge()}/> */}
                </View>
              </View>
              <View style={styles.content}>
                <UselessField 
                  style={myStyles.input1} 
                  label={'ADMINISTRATOR PIN'} 
                  onSubmitEditing={(e) => props.deleteTransaction(e.nativeEvent.text)} 
                  keyboardType="numeric"
                  secureTextEntry={true}
                  />
                  {/* <Input
                    placeholder={"ENTER ADxxxMIN/ROOT PIN"}
                    keyboardType={"numeric"}
                    inputContainerStyle={{backgroundColor: 'blue' }}
                    inputStyle={{fontSize: 30}}
                    secureTextEntry={false}
                    onSubmitEditing={({nativeEvent})=> props.deleteReceipt(nativeEvent.text)}
                  /> */}
                {/* </View> */}
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
	);
}

export class UselessField extends React.Component{

  render(){
    return (
      <View style={{borderColor: '#CCC', borderBottomWidth: 1}}>
        <Text style={myStyles.label1}>{this.props.label}</Text>
        <TextInput 
          style={this.props.style}
          defaultValue={this.props.defaultValue} 
          onSubmitEditing={this.props.onSubmitEditing} 
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}/>
      </View>
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
    deleteReceiptModalVisible: (visible) => dispatch(deleteReceiptModalVisible(visible)),
    receiptModalInvisible: () => dispatch(receiptModalInvisible()),
    printReceipt: (transaction) => dispatch(printReceipt(transaction)),
    deleteTransaction: (pin) => dispatch(deleteTransaction(pin))
	}
}

const closeModalButton = (props) => {
  return (
    <TouchableHighlight
      style={{alignSelf: 'flex-end'}}
      onPress={()=> {	props.receiptModalInvisible() }}>
      <Icon
        containerStyle={{padding: 10}}
        name="close"
        size={30}
        color="#333"
      />
    </TouchableHighlight>
  );
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
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'yellow'
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
    height: screenHeight - (screenHeight * 0.30 * 2),
    marginLeft: screenWidth * 0.25,
    marginRight: screenWidth * 0.25,
    marginTop: screenHeight * 0.15,
    marginBottom: screenHeight * 0.15,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
  label: {
    fontWeight: 'normal', 
    fontSize: 12, 
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReceiptModal);

