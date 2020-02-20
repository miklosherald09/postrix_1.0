import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert, TextInput, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { pinChangeVisible, pinChangeSaveField, pinChange } from '../../actions/pinActions'
import { userModalVisible, updateUserType, saveUserDetails } from '../../actions/usersActions'
import { USER_TYPE_ADMIN, USER_TYPE_STAFF, USER_TYPE_MANAGER } from '../../constants/constants'
import PinChangeModal from '../modals/PinChangeModal'
import { capitalize } from '../../functions'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const UserModal = (props) => {
 
  const { selected, pinChangeVisible } = props.pin
  const { userModalVisible, selectedUser } = props.users
  
  const submitField = (field, value) => {
    props.saveUserDetails(field, value)
  }

  const submitPin = (field, value) => {
  
    errors = []
    if(value == ''){
      errors.push('Pin must have a value')    
    }
    
    if(errors.length){
      alert(errors.join(', '))
    }
    else{
      props.pinChangeSaveField(field, value)
    }
  }

	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
				visible={userModalVisible}
				onRequestClose={() => {  props.userModalVisible(false) 	}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.userModalVisible(false)}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap} >
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.userModalVisible(false) }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>{selectedUser.name} - {selectedUser.type} - CHANGE PIN</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.userModalVisible(false)}/>
								</View>
							</View>
							<View style={styles.content}>
                <View style={{marginBottom: 20, flex: 1 }}>
                  <UselessField style={myStyles.input1} defaultValue={selectedUser.name} label={'Name'} onSubmitEditing={(e) => submitField('name', e.nativeEvent.text)} keyboardType="default"/>
                  <View style={{flexDirection: 'row'}}>
                    <Button
                      titleStyle={{fontSize: 20}}
                      title="Change Pin"
                      type="clear"
                      onPress={() => props.pinChangeVisible(true)}
                    />
                  </View>
                </View>
                <View style={{marginBottom: 20, height: 50 }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <UTypeButton onPress={() => props.updateUserType(USER_TYPE_ADMIN)} selectedUType={selectedUser.type} title={USER_TYPE_ADMIN} />
                    <UTypeButton onPress={() => props.updateUserType(USER_TYPE_STAFF)} selectedUType={selectedUser.type} title={USER_TYPE_STAFF} />
                    <UTypeButton onPress={() => props.updateUserType(USER_TYPE_MANAGER)} selectedUType={selectedUser.type} title={USER_TYPE_MANAGER} />
                  </View>
                </View>
							</View>
						</View>
					</TouchableOpacity>
				</TouchableOpacity>
			</Modal>
      <PinChangeModal />
		</View>
	);
}

function mapStateToProps(state) {
	return {
    pin: state.pin,
    users: state.users
	}
}

function mapDispatchToProps(dispatch) {
	return {
    pinChangeVisible: (val) => dispatch(pinChangeVisible(val)),
    pinChange: () => dispatch(pinChange()),
    pinChangeSaveField: (field, value) => dispatch(pinChangeSaveField(field, value)),
    userModalVisible: (visible) => dispatch(userModalVisible(visible)),
    updateUserType: (type) => dispatch(updateUserType(type)),
    saveUserDetails: (field, name) => dispatch(saveUserDetails(field, name))
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

export class SaveButton extends React.Component{

  render(){
    return (
      <Button 
        onPress={this.props.onPress} style={styles.opacity}
        title="SAVE"
        titleStyle={{fontSize: 20, color: '#2089dc'}}
        containerStyle={{marginHorizontal: 5}}
        type="clear"
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

export default connect(mapStateToProps, mapDispatchToProps)(UserModal)