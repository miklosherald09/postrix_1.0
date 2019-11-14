import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { submit } from 'redux-form'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton } from '../../components/Common'
import validate from '../../validations'
import myStyles from '../../constants/styles'
import { saveChargeModalVisible, saveCharge, deleteCharge } from '../../actions/chargeActions'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const onSubmit = (values, dispatch) => {
  dispatch(saveCharge(values))
}

const renderInput = ({
  label, 
  type,
  keyboardType,
  labelStyle,
  inputContainerStyle, 
  containerStyle,
  inputStyle,
  meta: { touched, error, warning }, 
  input: {onChange, ...restInput }}) => {

  return (
    <View>
      <Input
        label={label}
        type={type}
        keyboardType={keyboardType}
        labelStyle={labelStyle}
        inputContainerStyle={inputContainerStyle}
        containerStyle={containerStyle}
        onChangeText={onChange}
				inputStyle={inputStyle}
				{...restInput}
      />
      {touched && ((error && <Text style={styles.invalid}>{error}</Text>) ||
      (warning && <Text style={styles.warning}>{warning}</Text>))}
    </View>
  )
}

const UpdateItemModal = (props) => {
 
  const { saveChargeModalVisible } = props.charge
  const { userType } = props.pin
	
	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
				visible={saveChargeModalVisible}
				onRequestClose={() => {
					props.saveChargeModalVisible(false)
				}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.saveChargeModalVisible(false)}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap} >
							<View style={styles.headerPan}>
								<View style={styles.headerLeft}>
									<CloseButton onPress={ () => props.saveChargeModalVisible(false) }/>
								</View>
								<View style={styles.headerMiddle}>
									<Text style={myStyles.headerModal}>CHARGE</Text>
								</View>
								<View style={styles.headerRight}>
									<SaveButton userType={userType} onPress={() => props.saveCharge()}/>
								</View>
							</View>
							<View style={styles.content}>
								<View style={{flex: 1, flexDirection: 'row'}}>
									<View style={{flex: 1}}>
										<Field component={renderInput} name="name" label="NAME" keyboardType="default" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
									</View>
                  <View style={{flex: 1}}>
										<Field component={renderInput} name="price" label="PRICE" keyboardType="numeric" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
									</View>
								</View>
                <View style={{width: 100}}>
									<DeleteButton userType={userType} onPress={() => props.deleteCharge()}/>
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
    charge: state.charge,
    pin: state.pin,
		initialValues: {
			id: String(state.charge.selected.id),
			name: String(state.charge.selected.name),
			price: String(state.charge.selected.price)
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		saveChargeModalVisible: (v) => dispatch(saveChargeModalVisible(v)),
    saveCharge: () => dispatch(submit('SAVE_CHARGE_FORM')),
    deleteCharge: () => {
      Alert.alert( 'Charge', 'Are you sure?', [{
            text: 'Cancel',
            onPress: () => console.log('logout cancelled'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => dispatch(deleteCharge())},
        ],
        {cancelable: false},
      )
    }
	}
}

export class SaveButton extends React.Component{
  render(){
    return (
      (this.props.userType == 'ROOT' || this.props.userType == 'ADMIN')?
      <Button 
        onPress={this.props.onPress} style={styles.opacity}
        title="Save"
        containerStyle={{marginHorizontal: 5}}
        type="clear"
        inputStyle={{fontSize: 20}}
        titleStyle={{color: '#666', marginLeft: 5, fontSize: 20}}
      />:null
    )
  }
}

export class DeleteButton extends React.Component{

  render(){
    return (
      (this.props.userType == 'ROOT' || this.props.userType == 'ADMIN')?
      <Button
        onPress={this.props.onPress} style={styles.opacity}
        title="- Delete"
        containerStyle={{}}
        type="clear"
        titleStyle={{color: 'red', marginLeft: 5, fontSize: 20}}
        // icon={
        //   <Icon
        //     name="minus"
        //     size={15}
        //     color="#666"
        //   />
        // }
      />:null
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

export default (connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'SAVE_CHARGE_FORM',
	onSubmit: onSubmit,
	validate: validate,
  enableReinitialize: true
})(UpdateItemModal)))

