import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { saveItem, deleteItem, saveField, saveItemModalVisible } from '../../actions/itemActions'
import { deleteShelveItemByItemID } from '../../actions/shelvesActions'
import * as Yup from 'yup'
import { Formik, useFormik } from 'formik'


const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)


const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  price: Yup.string()
    .min(2, 'Too Short')
    .max(10, 'Too Long')
    .required('Required')
    .matches(/^\d+(\.\d+)*$/, 'Must be 5 or 9 digits')
});  

const SaveItemModal = (props) => {
 
  const { selectedItem, saveItemModalVisible } = props.items
  const { taxes } = props.tax
  	
	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
				visible={saveItemModalVisible}
				onRequestClose={() => {
					alert('Modal has been closed.');
				}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.saveItemModalVisible(false)}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
            <Formik
              initialValues={{ name: "xx" }}
              onSubmit={values => props.saveCharge(values)}
              isValidating={true}
              validationSchema={SignupSchema}
              enableReinitialize={true}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
						  
              <View style={styles.wrap} >
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.saveItemModalVisible(false) }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>SAVE ITEM</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.saveItem()}/>
								</View>
							</View>
							<View style={styles.content}>
              <View>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <Text>{errors.name}</Text>
                ) : null}
              </View>
                <View style={{marginBottom: 20}}>
                  <UselessField key='input-name' style={myStyles.input1} label={'NAME'} defaultValue={selectedItem.name} onChange={(e) => props.saveField('name', e.nativeEvent.text)} keyboardType="default"/>
								</View>
                <View style={{marginBottom: 20}}>
                  <UselessField key='input-barcode' style={myStyles.input1} label={'BARCODE'} defaultValue={selectedItem.barcode} onChange={(e) => props.saveField('barcode', e.nativeEvent.text)} keyboardType="default" />
								</View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1, marginBottom: 20}}>
                    <UselessField key='input-sellprice' style={myStyles.input1} label={'PRICE'} defaultValue={String(selectedItem.sellPrice)} onChange={(e) => props.saveField('sellPrice', e.nativeEvent.text)} keyboardType="numeric" />
									</View>
                  <View style={{flex: 1, marginBottom: 20, marginRight: 20}}>
                    <UselessField key='input-buyprice' style={myStyles.input1} label={'BASE PRICE'} defaultValue={String(selectedItem.buyPrice)} onChange={(e) => props.saveField('buyPrice', e.nativeEvent.text)} keyboardType="numeric" />
									</View>
								</View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TaxButton
                    onPress={() => props.saveField('tax_type', '')}
                    itemTax={selectedItem.tax_type || ''}
                    key={-1}
                    percent={""}
                    name="none"
                    title={"None"}
                  />
                </View>
                <View style={{width: 100}}>
									<DeleteButton onPress={() => props.deleteItem()}/>
                </View>
							</View>
						</View>
            )}
            </Formik>
          </TouchableOpacity>
				</TouchableOpacity>
			</Modal>
		</View>
	);
}

function mapStateToProps(state) {
	return {
    items: state.items,
    tax: state.tax
	}
}

function mapDispatchToProps(dispatch) {
	return {
		saveItemModalVisible: (visible) => dispatch(saveItemModalVisible(visible)),
    saveField: (field, value) => dispatch(saveField(field, value)),
    saveItem: () => { dispatch(saveItem())  },
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
          {text: 'OK', onPress: () => {
            dispatch(deleteItem()),
            dispatch(deleteShelveItemByItemID())
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
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput 
          style={this.props.style}
          defaultValue={this.props.defaultValue} 
          onSubmitEditing={this.props.onSubmitEditing} 
          onChange={this.props.onChange}
          keyboardType={this.props.keyboardType}/>
      </View>
    )
  }
}

export class DeleteButton extends React.Component{

  render(){
    return (
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
      />
    )
  }
}

export const TaxButton = ({title, name, itemTax, onPress}) => {
  return (
    <Button
      containerStyle={{flex: 1, padding: 10}}
      title={title}
      titleStyle={{fontSize: 22}}
      onPress={onPress}
      type={itemTax.toUpperCase() == name.toUpperCase()?'outline':'clear'}
    />
  )
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
  submitPan: {
    flex: 1,
    backgroundColor: 'blue'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveItemModal)