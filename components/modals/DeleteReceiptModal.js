import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Modal, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Button, Input } from 'react-native-elements'
import { CloseButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NumberFormat from 'react-number-format'
import { currency } from '../../constants/constants'
import { receiptModalInvisible, printReceipt, deleteReceiptModalVisible, deleteReceipt } from '../../actions/receiptActions'


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
        titleStyle={{fontSize: 12}}
        subtitle={'x' + item.count}
        subtitleStyle={{fontSize: 12}}
        rightTitle={String(item.accruePrice)}
        rightTitleStyle={{fontSize: 12}}
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
            <View style={styles.wrap}>
              <View style={styles.headerPan}>
                <View style={styles.headerLeft}>
                  <CloseButton onPress={ () => props.deleteReceiptModalVisible(false) }/>
                </View>
                <View style={styles.headerMiddle}>
                  <Text style={myStyles.headerModal}>RECEIPT - {selected.id}</Text>
                </View>
                <View style={styles.headerRight}>
                  {/* <SaveButton userType={userType} onPress={() => props.saveCharge()}/> */}
                </View>
              </View>
              <View style={styles.content}>
                <Text>ENTER ADMIN/MANAGER PIN</Text>
                <Input
                  label={"PIN"}
                  type={"default"}
                  keyboardType={"numeric"}
                  labelStyle={myStyles.label1}
                  containerStyle={{marginTop: 15}}
                  inputStyle={{}}
                  secureTextEntry={true}
                  onSubmitEditing={({nativeEvent})=> props.deleteReceipt(nativeEvent.text)}
                />
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
            name="minus-circle"
            size={30}
            color="#666"
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
            color="#666"
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
    deleteReceiptModalVisible: (visible) => dispatch(deleteReceiptModalVisible(visible)),
    receiptModalInvisible: () => dispatch(receiptModalInvisible()),
    printReceipt: (transaction) => dispatch(printReceipt(transaction)),
    deleteReceipt: (pin) => dispatch(deleteReceipt(pin))
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
		flex: 1,
		margin: 20,
  },
  invalid: {
    marginLeft: 10,
    color: 'red',
    fontSize: 12,
  },
  warning: {
    marginLeft: 10,
    color: 'red',
    fontSize: 12,
  },
  submitPan: {
    flex: 1,
    backgroundColor: 'blue'
  },
  headerPan: {
		flexDirection: 'row',
		height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
		borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    borderRadius: 10,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerMiddle: {
    flex: 2,
    alignItems: 'center'
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
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

