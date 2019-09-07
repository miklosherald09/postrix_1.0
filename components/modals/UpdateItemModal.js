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
import {
	getItems, saveItem, deleteItem,
	updateItemModalVisible as openModal,
	updateItemModalInvisible as closeModal } from '../../actions/itemActions'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const onSubmit = (values, dispatch) => {
  dispatch(saveItem(values))
	dispatch(getItems())
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
 
	const { input, updateItemModalVisible } = props.items
	
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
									<SaveButton onPress={() => props.saveItem()}/>
								</View>
							</View>
							<View style={styles.content}>
								<Field component={renderInput} name="name" label="NAME" keyboardType="default" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
								<Field component={renderInput} name="barcode" label="BARCODE" keyboardType="default" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
								<View style={{flex: 1, flexDirection: 'row'}}>
									<View style={{flex: 1}}>
										<Field component={renderInput} name="sellPrice" label="SELL PRICE" keyboardType="numeric" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
									</View>
                  <View style={{flex: 1}}>
										<Field component={renderInput} name="buyPrice" label="BUY PRICE" keyboardType="numeric" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
									</View>
								</View>
                <View style={{width: 100}}>
									<DeleteButton onPress={() => props.deleteItem()}/>
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
		initialValues: {
			id: String(state.items.input.id),
			name: String(state.items.input.name),
			barcode: String(state.items.input.barcode),
			buyPrice: String(state.items.input.buyPrice),
			sellPrice: String(state.items.input.sellPrice)
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setModalVisible: () => dispatch(openModal()),
    setModalInvisible: () => dispatch(closeModal()),
    saveItem: () => dispatch(submit('UPDATE_ITEM_FORM')),
    deleteItem: () => {
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
          {text: 'OK', onPress: () => dispatch(deleteItem())},
        ],
        {cancelable: false},
      )
    }
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

export default (connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'UPDATE_ITEM_FORM',
	onSubmit: onSubmit,
	validate: validate,
  enableReinitialize: true
})(UpdateItemModal)))

