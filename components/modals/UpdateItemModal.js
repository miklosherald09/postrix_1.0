import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert, TextInput, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { submit } from 'redux-form'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton } from '../../components/Common'
import validate from '../../validations'
import myStyles from '../../constants/styles'
import { getItems, saveItem, deleteItem, saveField,	updateItemModalVisible as openModal, updateItemModalInvisible as closeModal } from '../../actions/itemActions'
import { deleteShelveItemByItemID } from '../../actions/shelvesActions'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const UpdateItemModal = (props) => {
 
  const { input, updateItemModalVisible } = props.items
  
  const submitField = (field, value) => {
    console.log('field: '+field)
    console.log('field: '+value)
  
    errors = []
    if(field == 'name'){
      if(value == ''){
        errors.push(field + ' must have a value')    
      }
    }

    if(field == 'barcode'){
    }

    if(field == 'buyPrice'){
      if(value == ''){
        errors.push(field + ' must have a value')    
      }
    }

    if(field == 'sellPrice'){
      if(value == ''){
        errors.push(field + ' must have a value')    
      }
    }

    console.log(errors)
  
    if(errors.length){
      alert(errors.join(', '))
    }
    else{
      props.saveField(field, value)
    }
  }

	
	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
				visible={updateItemModalVisible}
				onRequestClose={() => {
					alert('Modal has been closed.');
				}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.setModalInvisible()}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap} >
							<View style={styles.headerPan}>
								<View style={styles.headerLeft}>
									<CloseButton onPress={ () => props.setModalInvisible() }/>
								</View>
								<View style={styles.headerMiddle}>
									<Text style={myStyles.headerModal}>EDIT ITEM</Text>
								</View>
								<View style={styles.headerRight}>
									<SaveButton onPress={() => props.saveItem(input)}/>
								</View>
							</View>
							<View style={styles.content}>

                <View style={{marginBottom: 20}}>
                  <UselessField key='input-name' style={myStyles.input1} label={'NAME'} defaultValue={input.name} onSubmitEditing={(e) => submitField('name', e.nativeEvent.text)} keyboardType="default"/>
								</View>
                <View style={{marginBottom: 20}}>
                  <UselessField key='input-barcode' style={myStyles.input1} label={'BARCODE'} defaultValue={input.barcode} onSubmitEditing={(e) => submitField('barcode', e.nativeEvent.text)} keyboardType="default" />
								</View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1, marginBottom: 20}}>
                    <UselessField key='input-sellprice' style={myStyles.input1} label={'PRICE'} defaultValue={String(input.sellPrice)} onSubmitEditing={(e) => submitField('sellPrice', e.nativeEvent.text)} keyboardType="numeric" />
									</View>
                  <View style={{flex: 1, marginBottom: 20, marginRight: 20}}>
                    <UselessField key='input-buyprice' style={myStyles.input1} label={'BASE PRICE'} defaultValue={String(input.buyPrice)} onSubmitEditing={(e) => submitField('buyPrice', e.nativeEvent.text)} keyboardType="numeric" />
									</View>
								</View>
                <View style={{width: 100}}>
									<DeleteButton onPress={() => props.deleteItem(input)}/>
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
		items: state.items,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setModalVisible: () => dispatch(openModal()),
    setModalInvisible: () => dispatch(closeModal()),
    saveField: (field, value) => dispatch(saveField(field, value)),
    saveItem: (input) => {
      dispatch(saveItem(input))
      dispatch(getItems())
    },
    deleteItem: (item) => {
      Alert.alert(
        'Logout',
        'Are you sure?',
        [
          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('logout cancelled'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            dispatch(deleteItem()),
            dispatch(deleteShelveItemByItemID(item.id))
          }},
        ],
        {cancelable: false},
      )
    }

	}
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
          keyboardType={this.props.keyboardType}/>
      </View>
    )
  }
}

export class SaveButton extends React.Component{

  render(){
    return (
      <Button 
        onPress={this.props.onPress} style={styles.opacity}
        title="Save"
        containerStyle={{marginHorizontal: 5}}
      />
    )
  }
}

export class DeleteButton extends React.Component{

  render(){
    return (
      <Button
        onPress={this.props.onPress} style={styles.opacity}
        title="Delete"
        containerStyle={{}}
        type="clear"
        titleStyle={{color: '#666', marginLeft: 5}}
        icon={
          <Icon 
            name="minus"
            size={15}
            color="#666"
          />
        }
      />
    )
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItemModal)