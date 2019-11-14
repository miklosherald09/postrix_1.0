import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Icon, Input } from 'react-native-elements'
import UpdateItemSubmitButton from '../buttons/UpdateItemSubmitButton'
import DeleteItemButton from '../buttons/DeleteItemButton'
import formStyles from '../../constants/styles'
import {
	getItems, saveItem,
	updateItemModalVisible as openModal, 
	updateItemModalInvisible as closeModal } from '../../actions/itemActions'


const submit = (values, dispatch) => {
  dispatch(saveItem(values));
	dispatch(getItems());
	dispatch(closeModal()); 
}

const deleteItem = (values, dispatch) => {
	dispatch()
}

const renderInput = ({
  label, 
  type,
  keyboardType, 
  meta: { touched, error, warning }, 
  inputContainerStyle, 
  input: {onChange, ...restInput }}) => {

  return (
    <View>
      <Input
        type={type}
        style={styles.input} 
        keyboardType={keyboardType}
        onChangeText={onChange}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        inputContainerStyle={inputContainerStyle}
				placeholder={label}
				{...restInput}
      />
      {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
      (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
    </View>
  )
}

const UpdateItemModal = (props) => {
 
	const { input, updateItemModalVisible } = props.items
	
	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="slide"
        transparent={true}
        hardwareAccelerated={true}
				visible={updateItemModalVisible}
				onRequestClose={() => {
					console.log('Modal has been closed.');
				}}
        >
				<View style={styles.container}>
					<View style={styles.modalTopMenu}>
						<View style={styles.modalTitle}>
							<Text style={{color: 'white', fontSize: 20}}>Update Item</Text>
						</View>
						<View style={styles.closeButtonPan}>
							<TouchableHighlight
								style={{alignSelf: 'flex-end'}}
								onPress={()=> {	props.setModalInvisible() }}>
								<Icon
									name="close"
									size={30}
									color="white"
								/>
							</TouchableHighlight>
						</View>
					</View>
					<View style={styles.content}>
						<View>
						</View>
            <View style={styles.container}>
              <Field component={renderInput} name="name" label="Name" keyboardType="default" inputContainerStyle={{...formStyles.inputContainerStyle, ...formStyles.curveTopLeft, ...formStyles.curveTopRight}} />
              <Field component={renderInput} name="barcode" label="Barcode" keyboardType="default"  inputContainerStyle={formStyles.inputContainerStyle} />
              <View style={{flex: 1, flexDirection: 'row'}}>
	              <View style={{flex: 1}}>
                  <Field component={renderInput} keyboardType="numeric" name="buyPrice" label="Buy Price" inputContainerStyle={{...formStyles.inputContainerStyle, ...formStyles.noRightBorder, ...formStyles.curveBottomLeft, borderBottomWidth: 2}} />
                </View>
                <View style={{flex: 1}}>
                  <Field component={renderInput} keyboardType="numeric" name="sellPrice" label="Sell Price" inputContainerStyle={{...formStyles.inputContainerStyle, ...formStyles.curveBottomRight, borderBottomWidth: 2}} />
                </View>
              </View>
              <View style={styles.submitPan}>
                <UpdateItemSubmitButton />
								<DeleteItemButton />
             	</View>
            </View>
					</View>
				</View>
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
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'UPDATE_ITEM_FORM',
	onSubmit: submit,
  enableReinitialize: true
})(UpdateItemModal)))

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
		backgroundColor: 'white',
		height: Dimensions.get('window').height, // approximate a square
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
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
	containerStyle: {
		paddingHorizontal: 0,
	},
	container: {
		backgroundColor: 'white', 
		flex: 1,
		height: '100%'
	},
	modalTopMenu: {
		backgroundColor: '#202124',
		flexDirection: 'row',
		height: 60,
		alignItems: 'stretch'
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
	submitPan: {

	}
});

