import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { hideItemColorsModal, setItemColor, selectColor } from '../../actions/itemColorsActions'
import { shelveModalInvisible, updateModalShelve, saveShelve, deleteShelve } from '../../actions/shelvesActions'


const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const ShelveModal = (props) => {
 
  const { shelveModalVisible, modalShelve } = props.shelves
  const { userType } = props.pin

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
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.shelveModalInvisible() } />
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>SHELVE</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.saveShelve()} />
								</View>
							</View>
							<View style={styles.content}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flex: 1, paddingRight: 10}}>
                    <Input
                      label={'SHELVE NAME'}
                      keyboardType={'default'}
                      labelStyle={styles.label}
                      onChangeText={text => props.updateModalShelve(text)}
                      defaultValue={modalShelve.name}
                      inputStyle={{fontSize: 20}}
                    />
                  </View>
                  <View style={{ height: 50, flexDirection: 'row'}}>
                    <DeleteButton userType={userType} activeShelve={modalShelve} onPress={() => props.deleteShelve(modalShelve)} />
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
    pin: state.pin
	}
}

function mapDispatchToProps(dispatch) {
	return {
    shelveModalInvisible: () => dispatch(shelveModalInvisible()),
    selectColor: (v) => dispatch(selectColor(v)),
    setItemColor: () => dispatch(setItemColor()),
    updateModalShelve: (text) => dispatch(updateModalShelve(text)),
    saveShelve: () => dispatch(saveShelve()),
    deleteShelve: (shelve) => dispatch(deleteShelve(shelve))
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
        titleStyle={{color: '#2089dc', fontSize: 20}}
      />
    )
  }
}

export class DeleteButton extends React.Component{

  render(){
    return (
      ((this.props.userType == 'ROOT' || this.props.userType == 'ADMIN') && this.props.activeShelve.id !== undefined) ?
      <Button 
        onPress={this.props.onPress} style={styles.opacity}
        title="Delete"
        containerStyle={{marginHorizontal: 5}}
        type="clear"
        titleStyle={{color: 'red', fontSize: 20}}
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
    height: screenHeight - (screenHeight * 0.20 * 2),
    marginLeft: screenWidth * 0.20,
    marginRight: screenWidth * 0.20,
    marginTop: screenHeight * 0.10,
    marginBottom: screenHeight * 0.20,
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShelveModal)

