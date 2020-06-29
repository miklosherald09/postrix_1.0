import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Button, Input, CheckBox } from 'react-native-elements'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { saveItem, deleteItem, saveField, saveItemModalVisible, saveItemTax } from '../../actions/itemActions'
import { deleteShelveItemByItemID } from '../../actions/shelvesActions'
import * as Yup from 'yup'
import { Formik } from 'formik'


const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  barcode: Yup.string()
    .max(50, 'Too Long')
    .required('Required'),
  sellPrice: Yup.string()
    .max(20, 'Too Long')
    .required('Required')
    .matches(/^\d+(\.\d+)*$/, 'Must be number'),
  buyPrice: Yup.string()
    .max(20, 'Too Long')
    .required('Required')
    .matches(/^\d+(\.\d+)*$/, 'Must be number'),
})

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
              initialValues={{
                id: selectedItem.id,
                name: selectedItem.name,
                barcode: selectedItem.barcode,
                sellPrice: selectedItem.sellPrice,
                buyPrice: selectedItem.buyPrice,
                tax_type: selectedItem.tax_type
              }}
              onSubmit={values => props.saveItem(values)}
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
									<CheckButton onPress={handleSubmit}/>
								</View>
							</View>
							<View style={styles.content}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, marginBottom: 20}}>
                    <Input 
                      label={'Name'}
                      labelStyle={myStyles.label}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      defaultValue={selectedItem.name}
                      onChange={(e) => props.saveField('name', e.nativeEvent.text)} 
                      keyboardType="default"
                    />
                    {errors.name && touched.name ? (
                      <Text style={myStyles.fieldError}>{errors.name}</Text>
                    ) : null}
                  </View>
                  <View style={{flex: 1, marginBottom: 20}}>
                    <Input
                      style={myStyles.input1}
                      label={'Barcode/Unique ID'}
                      labelStyle={myStyles.label}
                      onChangeText={handleChange('barcode')}
                      onBlur={handleBlur('barcode')}
                      defaultValue={selectedItem.barcode}
                      onChange={(e) => props.saveField('barcode', e.nativeEvent.text)}
                      keyboardType="default"
                    />
                    {errors.barcode && touched.barcode ? (
                      <Text style={myStyles.fieldError}>{errors.barcode}</Text>
                    ) : null}
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, marginBottom: 20}}>
                    <Input
                      style={myStyles.input1}
                      label={'Sell Price'}
                      labelStyle={myStyles.label}
                      onChangeText={handleChange('sellPrice')}
                      onBlur={handleBlur('sellPrice')}
                      defaultValue={String(selectedItem.sellPrice)}
                      onChange={(e) => props.saveField('sellPrice', e.nativeEvent.text)}
                      keyboardType="numeric"
                    />
                    {errors.sellPrice && touched.sellPrice ? (
                      <Text style={myStyles.fieldError}>{errors.sellPrice}</Text>
                    ) : null}
									</View>
                  <View style={{flex: 1, marginBottom: 20}}>
                    <Input
                      style={myStyles.input1}
                      label={'Buy Price'}
                      labelStyle={myStyles.label}
                      onChangeText={handleChange('buyPrice')}
                      onBlur={handleBlur('buyPrice')}
                      defaultValue={String(selectedItem.buyPrice)}
                      onChange={(e) => props.saveField('buyPrice', e.nativeEvent.text)}
                      keyboardType="numeric"
                    />
                    {errors.buyPrice && touched.buyPrice ? (
                      <Text style={myStyles.fieldError}>{errors.buyPrice}</Text>
                    ) : null}
									</View>
                  
								</View>
                <View style={{flex: 1}}>
                  <ScrollView>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                      taxes.map(t => {
                        return (
                          <CheckBox
                            onPress={() => props.saveField('tax_type', t.id)}
                            key={"tax-checkbox-"+t.id}
                            center
                            title={t.name}
                            checked={selectedItem.tax_type == t.id?true:false}
                          />
                        )
                      })
                    }
                    </View>
                  </ScrollView>
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
    saveItem: (values) => { dispatch(saveItem(values)) },
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
    },
    saveItemTax: (tax) => dispatch(saveItemTax(tax))
	}
}

export class UselessField extends React.Component{

  render(){
    return (
      <View>
        <Input 
          style={this.props.style}
          defaultValue={this.props.defaultValue} 
          onSubmitEditing={this.props.onSubmitEditing} 
          onChange={this.props.onChange}
          label={this.props.label}
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
        title="Delete"
        containerStyle={{}}
        type="clear"
        titleStyle={{color: 'red', fontSize: 20}}
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