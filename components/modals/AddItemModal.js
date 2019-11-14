import React from 'react'
import { StyleSheet, Text,  View, Dimensions, Modal, TouchableOpacity } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import RemoteSubmitButton from '../remote/RemoteSubmitButton'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { getItems, saveItem } from "../../actions/itemActions"
import { CloseButton } from '../../components/Common'
import validate from '../../validations'
import myStyles from '../../constants/styles'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const submit = (values, dispatch) => {
  dispatch(saveItem(values))
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
      />
      {touched && ((error && <Text style={styles.invalid}>{error}</Text>) ||
      (warning && <Text style={styles.warning}>{warning}</Text>))}
    </View>
  )
}

const addItemModal = (props) => {
 
  const { addItemModalvisible, saveItemMsg } = props.items;
	
	return (
		<View style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={addItemModalvisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.setModalInvisible()}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} >
            <View style={styles.wrap} >
              <View style={styles.modalTopMenu}>
                <View style={{ width: 50, alignItems: 'flex-start' }}>
                  <CloseButton onPress={ () => props.setModalInvisible() }/>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={myStyles.headerModal}>ADD ITEM</Text>
                </View>
                <View style={{ width: 100, marginHorizontal: 3 }}>
                  <RemoteSubmitButton />
                </View>
              </View>
              <View style={{flex: 1, marginTop: 15}}>
                <Field component={renderInput} name="name" label="NAME" keyboardType="default" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
                <Field component={renderInput} name="barcode" label="BARCODE" keyboardType="default" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Field component={renderInput} name="sellPrice" label="PRICE" keyboardType="numeric" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
                  </View>
                  <View style={{flex: 1}}>
                    <Field component={renderInput} name="buyPrice" label="BASE PRICE" keyboardType="numeric" labelStyle={styles.label} containerStyle={{marginTop: 15}} />
                  </View>
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
		setModalVisible: () => dispatch({ type: 'ADD_ITEM_MODAL_VISIBLE' }),
    setModalInvisible: () => dispatch({ type: 'ADD_ITEM_MODAL_INVISIBLE' }),
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ADD_ITEM_FORM',
  onSubmit: submit,
  validate: validate
  // enableReinitialize: false
})(addItemModal)))

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
  modalTopMenu: {
		flexDirection: 'row',
		height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
		borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    borderRadius: 10,
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
    fontSize: 18, 
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
});

