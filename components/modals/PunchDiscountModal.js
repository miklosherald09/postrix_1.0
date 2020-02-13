import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { punchDiscountVisible, togglePunchDiscount, getPunchDiscounts } from '../../actions/punchedActions'
import { capitalize } from '../../functions'
import { currency } from '../../constants/constants'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const PunchDiscountModal = (props) => {

  useEffect(() => {
    props.getPunchDiscounts()
  }, [])
 
 
  const { punchDiscountVisible, punchDiscounts } = props.punched
  
	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
				visible={punchDiscountVisible}
				onRequestClose={() => {  props.punchDiscountVisible(false) 	}}>
				<TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.punchDiscountVisible(false)}}>
					<TouchableOpacity activeOpacity={1} style={styles.container}>
						<View style={styles.wrap}>
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.punchDiscountVisible(false) }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>PUNCH DISCOUNT</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.punchDiscountVisible(false)}/>
								</View>
							</View>
							<View style={styles.content}>
                <View style={{flexDirection: 'row'}}>
                  {
                    punchDiscounts.map((v, i) => {

                      preLabel = v.type == 'BILL'?currency:''
                      postLabel = v.type == 'PERCENTAGE'?'%':''

                      return (
                        <Button
                          type={v.selected?'solid':'outline'} 
                          containerStyle={{marginRight: 10}}
                          key={v.id}
                          title={ v.name + ' ' + '(' + preLabel + v.value + postLabel +')'}
                          titleStyle={{marginLeft: 10, fontSize: 20}}
                          onPress={() => props.togglePunchDiscount(v)}
                          icon={
                            v.selected?
                            <Icon
                              name={"check"}
                              color="white"
                              size={20}
                            />:null
                          }
                        />
                      )
                    })
                  }
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
    punched: state.punched
	}
}

function mapDispatchToProps(dispatch) {
	return {
    togglePunchDiscount: (v) => {
      dispatch(togglePunchDiscount(v))
    },
    punchDiscountVisible: (v) => dispatch(punchDiscountVisible(v)),
    getPunchDiscounts: () => dispatch(getPunchDiscounts()),
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

export default connect(mapStateToProps, mapDispatchToProps)(PunchDiscountModal)