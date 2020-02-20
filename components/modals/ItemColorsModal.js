import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { ColorPicker } from 'react-native-color-picker'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { hideItemColorsModal, setItemColor, selectColor } from '../../actions/itemColorsActions'
import { TouchableHighlight } from 'react-native-gesture-handler';
// import Slider from '@react-native-community/slider'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const onSubmit = (values, dispatch) => {
  dispatch(saveItem(values))
	dispatch(getItems())
}

const ItemColorsModal = (props) => {
 
  const { itemColorsModalVisible, colors, selectedColor } = props.itemColors

  return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
        visible={itemColorsModalVisible}
				onRequestClose={() => {
					props.hideModal()
				}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.hideModal()}}>
					<TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap}>
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.hideModal() } />
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>CHANGE ITEM COLOR</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.setItemColor()} />
								</View>
							</View>
							<View style={styles.content}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1, paddingRight: 10, justifyContent: 'center', alignContent: 'center'}}>
                    <ColorPicker
                      onColorSelected={color => props.selectColor(color)}
                      style={{flex: 5, margin: 10}}
                      hideSliders={true}
                    />
                    <View style={{borderRadius: 5, flex: 1, height: 50,  backgroundColor: selectedColor}}>
                      <Text style={{margin: 10, fontSize: 20, color: 'white'}}>COLOR</Text>
                    </View>
                  </View>
                  <View style={{flex: 1, paddingLeft: 10 }}>
                    <View style={{flex: 1, flexDirection: 'row' }}>
                      {
                        colors[0].map((v, i) => {
                          return(
                            <ColorButton key={i} color={v} onPress={() => {props.selectColor(v)}}/>
                          )
                        })
                      }
                    </View>
                    <View style={{flex: 1, flexDirection: 'row' }}>
                      {
                        colors[1].map((v, i) => {
                          return(
                            <ColorButton key={i} color={v} onPress={() => {props.selectColor(v)}}/>
                          )
                        })
                      }
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      {
                        colors[2].map((v, i) => {
                          return(
                            <ColorButton key={i} color={v} onPress={() => {props.selectColor(v)}}/>
                          )
                        })
                      }
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      {
                        colors[3].map((v, i) => {
                          return(
                            <ColorButton key={i} color={v} onPress={() => {props.selectColor(v)}}/>
                          )
                        })
                      }
                    </View>
                  </View>
                </View>
                {/* <Slider
                  style={{width: 200, height: 40}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                /> */}

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
		itemColors: state.itemColors,
	}
}

function mapDispatchToProps(dispatch) {
	return {
    hideModal: () => dispatch(hideItemColorsModal()),
    selectColor: (v) => dispatch(selectColor(v)),
    setItemColor: () => dispatch(setItemColor())
	}
}

export class ColorButton extends React.Component{
  render(){
    return (
      <Button 
        containerStyle={{flex: 1, borderRadius: 0}} 
        buttonStyle={{...styles.colorButton, backgroundColor: this.props.color}} 
        onPress={this.props.onPress}>
      </Button>
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
  colorButton: {
    borderRadius: 0, 
    flex: 1, 
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemColorsModal)

