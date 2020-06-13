import React from 'react'
import { StyleSheet, Switch, Text, View, TouchableOpacity, Modal, Dimensions, Alert, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { CloseButton, CheckButton, DeleteButton,  } from '../../components/Common'
import myStyles from '../../constants/styles'
import { taxModalVisible, saveInput, saveTax, deleteTax } from '../../actions/taxActions'
import { capitalize } from '../../functions'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const TaxModal = (props) => {
 
  const { taxModalVisible, selectedTax } = props.tax
  
	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
				visible={taxModalVisible}
				onRequestClose={() => {  props.taxModalVisible(false) 	}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.taxModalVisible(false)}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap} >
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.taxModalVisible(false) }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>TAX</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.saveTax()}/>
								</View>
							</View>
							<View style={styles.content}>
                <View style={{marginBottom: 20, flex: 1 }}>
                  <UselessField style={myStyles.input1} defaultValue={selectedTax.name} label={'Name'} onChange={(e) => props.saveInput('name', e.nativeEvent.text)} keyboardType="default"/>
                  <UselessField style={myStyles.input1} defaultValue={String(selectedTax.percent)} label={'Percent'} onChange={(e) => props.saveInput('percent', e.nativeEvent.text)} keyboardType="default"/>
                  <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <Switch value={selectedTax.enabled?true:false} onValueChange={(v) => props.saveInput('enabled', v)} style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }} />
                    <Text style={{fontSize: 15, marginTop: 2}}>{selectedTax.enabled?'On':'Off'}</Text>
                  </View>
                </View>
                <View style={{height: 50 }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <DeleteButton onPress={() => props.deleteTax(selectedTax.id)} color={'#666'}/>
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
    tax: state.tax
	}
}

function mapDispatchToProps(dispatch) {
	return {
    saveTax: () => {
      dispatch(saveTax())
      dispatch(taxModalVisible(false))
    },
    taxModalVisible: (val) => dispatch(taxModalVisible(val)),
    saveInput: (name, value) => dispatch(saveInput(name, value)),
    deleteTax: (id) => {
      Alert.alert( 'Delete Tax', 'Are you sure?', 
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => dispatch(deleteTax(id)) }
        ],
        { cancelable: false },
      )
    }
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
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}/>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaxModal)