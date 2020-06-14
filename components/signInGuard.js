import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import DrawerNavigator from '../navigation/DrawerNavigation'
import PinScreen from '../screens/PinScreen'
import NavigationService from '../NavigationService'

const SignInGuard = (props) => {

  const { signedIn } = props.pin

  // return(
  //   <DrawerNavigator ref={navigatorRef => {
  //     NavigationService.setTopLevelNavigator(navigatorRef);
  //   }} />
  // )

  if(signedIn){
    return(
        <DrawerNavigator ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }} />
    )
  }
  else{
    return(
      <View style={{flex: 1}}>
        <PinScreen />
      </View>
    )
  }
}

function mapStateToProps(state) {
	return {
    pin: state.pin,
    
	}
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchItems: (text) => { dispatch({type: 'xx'}) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInGuard);