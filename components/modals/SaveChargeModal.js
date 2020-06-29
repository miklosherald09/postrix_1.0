import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Input, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { saveChargeModalVisible, saveCharge, deleteCharge } from '../../actions/chargeActions'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'

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

// Async Validation
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validate = (values, props /* only available when using withFormik */) => {
  return sleep(2000).then(() => {
    const errors = {};
    if (['admin', 'null', 'god'].includes(values.username)) {
      errors.username = 'Nice try';
    }
    // ...
    return errors;
  });
};

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
        // onChangeText={onChange}
				inputStyle={inputStyle}
				{...restInput}
      />
      {touched && ((error && <Text style={styles.invalid}>{error}</Text>) ||
      (warning && <Text style={styles.warning}>{warning}</Text>))}
    </View>
  )
}

const UpdateItemModal = (props) => {
 
  const { saveChargeModalVisible, selected } = props.charge
  const { userType } = props.pin

   const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
            <Formik
              initialValues={{ name: selected.name, price: String(selected.price) }}
              onSubmit={values => props.saveCharge(values)}
              isValidating={true}
              validationSchema={SignupSchema}
              enableReinitialize={true}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.wrap} >
              <View style={myStyles.headerPan}>
                <View style={myStyles.headerLeft}>
                  <CloseButton onPress={ () => props.saveChargeModalVisible(false) }/>
                </View>
                <View style={myStyles.headerMiddle}>
                  <Text style={myStyles.headerModal}>CHARGE</Text>
                </View>
                <View style={myStyles.headerRight}>
                  <CheckButton userType={userType} onPress={handleSubmit} />
                </View>
            </View>
            <View style={styles.content}>
              <View>
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  label="Name"
                  labelStyle={styles.label}
                  containerStyle={{marginBottom: 15}}
                />
                {errors.name && touched.name ? (
                  <Text>{errors.name}</Text>
                ) : null}
                <Input
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price}
                  labelStyle={styles.label}
                  keyboardType="number-pad"
                  label="Price"
                />
                {errors.price && touched.price ? (
                  <Text>{errors.price}</Text>
                ) : null}
              {/* <Button onPress={handleSubmit} title="Submit" /> */}
              </View>
              </View>
            </View>
            )}
            </Formik>
            <View style={{width: 100}}>
            {
              selected.id?
              <DeleteButton userType={userType} onPress={() => props.deleteCharge()}/>:null
            }
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
    saveCharge: (v) => dispatch(saveCharge(v)),
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

export class DeleteButton extends React.Component{

  render(){
    return (
      (this.props.userType == 'ROOT' || this.props.userType == 'ADMIN')?
      <Button
        onPress={this.props.onPress} style={styles.opacity}
        title="Delete"
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItemModal)

