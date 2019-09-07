import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { ColorPicker } from 'react-native-color-picker'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { hideItemColorsModal, setItemColor, selectColor } from '../../actions/itemColorsActions'
import { shelveModalInvisible, addShelve, updateModalShelve, saveShelve } from '../../actions/shelvesActions'
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import { getData } from '../../functions'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const ShelveModal = (props) => {
 
  const { shelveModalVisible, modalShelve } = props.shelves

	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
        visible={shelveModalVisible}
				onRequestClose={() => {
					props.shelveModalInvisible()
				}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.shelveModalInvisible()}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap}>
							<View style={styles.headerPan}>
								<View style={styles.headerLeft}>
									<CloseButton onPress={ () => props.shelveModalInvisible() } />
								</View>
								<View style={styles.headerMiddle}>
									<Text style={myStyles.headerModal}>SHELVE</Text>
								</View>
								<View style={styles.headerRight}>
									<SaveButton onPress={() => props.saveShelve()} />
								</View>
							</View>
							<View style={styles.content}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flex: 1, paddingRight: 10}}>
                  <Input
                    label={'SHELVE NAME'}
                    keyboardType={'default'}
                    labelStyle={styles.label}
                    // onSubmitEditing={(e) => props.addShelve(e.nativeEvent.text)}
                    onChangeText={text => props.updateModalShelve(text)}
                    value={modalShelve.name}
                  />
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
		shelves: state.shelves,
	}
}

function mapDispatchToProps(dispatch) {
	return {
    shelveModalInvisible: () => dispatch(shelveModalInvisible()),
    selectColor: (v) => dispatch(selectColor(v)),
    setItemColor: () => dispatch(setItemColor()),
    addShelve: (v) => dispatch(addShelve(v)),
    updateModalShelve: (text) => dispatch(updateModalShelve(text)),
    saveShelve: () => dispatch(saveShelve())
	}
}

export class SaveButton extends React.Component{

  render(){
    return (
      <Button 
        onPress={this.props.onPress} style={styles.opacity}
        title="Save"
        containerStyle={{marginHorizontal: 5}}
        type="clear"
        titleStyle={{color: '#2089dc'}}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShelveModal)

