import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert, TextInput, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { pinChangeVisible, pinChangeSaveField, pinChange } from '../../actions/pinActions'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const PinChangeModal = (props) => {
 
  const { selected, pinChangeVisible } = props.pin
  
  const submitField = (field, value) => {
    console.log('field: '+field)
    console.log('field: '+value)
  
    errors = []
    if(value == ''){
      errors.push('Pin must have a value')    
    }

    console.log(errors)
  
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
				visible={pinChangeVisible}
				onRequestClose={() => {  props.pinChangeVisible(false) 	}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.pinChangeVisible(false)}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap} >
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.pinChangeVisible(false) }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>{selected.type} - CHANGE PIN</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.pinChange()}/>
								</View>
							</View>
							<View style={styles.content}>
                <View style={{marginBottom: 20}}>
                  <UselessField secureTextEntry={true} style={myStyles.input1} label={'PIN'} onSubmitEditing={(e) => submitField('pin1', e.nativeEvent.text)} keyboardType="numeric"/>
								</View>
                <View style={{marginBottom: 20}}>
                  <UselessField secureTextEntry={true} style={myStyles.input1} label={'CONFIRM'} onSubmitEditing={(e) => submitField('pin2', e.nativeEvent.text)} keyboardType="numeric" />
								</View>
                <View style={{width: 100}}>
									{/* <DeleteButton onPress={() => props.deleteItem()}/> */}
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
		pin: state.pin,
	}
}

function mapDispatchToProps(dispatch) {
	return {
    pinChangeVisible: (val) => dispatch(pinChangeVisible(val)),
    pinChange: () => dispatch(pinChange()),
    pinChangeSaveField: (field, value) => dispatch(pinChangeSaveField(field, value))
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

export default connect(mapStateToProps, mapDispatchToProps)(PinChangeModal)