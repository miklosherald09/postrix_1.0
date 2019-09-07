import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { signIn } from '../actions/pinActions'

const PinScreen = (props) => {

  const { invalidPin } = props.pin

	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
        <Image
          style={{width: 200, height: 76}}
          source={require('../assets/postrix-logo.png')}
        />
        <TextInput
          placeholder="press to enter"
          textAlign={"center"}
          keyboardType={'number-pad'}
          clearTextOnFocus={true}
          secureTextEntry={true}
          onSubmitEditing={({nativeEvent})=> props.signIn(nativeEvent.text)}
        />
        <Text style={{color: '#E67C73'}}>{invalidPin?'invalid pin':''}</Text>
			</View>
		</View>
	);
}

function mapStateToProps(state) {
	return {
    pin: state.pin,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (text) => { dispatch(signIn(text)) },
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
		flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: '#039BE5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topMenu: {
		height: 60,
		flexDirection: 'row',
    backgroundColor: 'white',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PinScreen);