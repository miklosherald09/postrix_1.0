import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import SettingsNav from '../navigation/SettingsNav'
import UserModal from  '../components/modals/UserModal'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'

import Firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyDIU0Ym92RmfViRRHr5wwT6YE1BXA5_R7M',
  authDomain: 'postrixc137.firebaseapp.com',
};
let app = Firebase.initializeApp(config);


console.log('shittifdkjf')
GoogleSignin.configure({
  webClientId: '353265660190-gaaeavueigpmaoavql1ocdq6lrq5hhkt.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const SettingsBackupScreen = props => {


	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { users } = props.users

  // Somewhere in your code
  const _signIn = async () => {
    alert('pos0')
    try {
      alert('pos1')
      await GoogleSignin.hasPlayServices()
      alert('pos2')
      const userInfo = await GoogleSignin.signIn()
      alert('pos3')
      alert(userInfo)

    } catch (error) {
      alert("error signin google: ")
      alert(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert(error)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert(error)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert(error)
        // play services not available or outdated
      } else {
        alert(error)
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topMenu}>
        <View style={styles.topMenuLeft}>
          <MenuButton openMenu={openMenu.bind(this)} color="#333"/>
        </View>
        <View style={styles.topMenuRight}>
        </View>
      </View>
      <View style={styles.wrap}>
        <View style={styles.leftContent}>
          <SettingsNav />
        </View>
        <View style={styles.rightContent}>
          <View style={{flex: 1, backgroundColor: 'white', margin: 15, padding: 15}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Button
                title="shit"
                onPress={() => signIn()}
                titleStyle={{fontSize: 20}}
              />

              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={_signIn}
                disabled={false} />
              
            </View>
          </View>
        </View>
      </View>
      <UserModal />
    </View>
  );
}

function mapStateToProps(state) {
	return {
    pin: state.pin,
    users: state.users
	}
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
  }
}

const styles = StyleSheet.create({
  user: {
    backgroundColor: 'red',
  },
  image:  {
  },
  name: {
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
		flexDirection: 'column',
  },
  topMenu: {
		height: 60,
		flexDirection: 'row',
    backgroundColor: 'white',
	},
  topMenuLeft: {
    flex: 4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CCC',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
	},
	topMenuRight: {
    flex: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContent: {
    flex: 4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CCC'

  },
  rightContent: {
    flex: 12,
    backgroundColor: '#EEE',
  },
  navLinks: {
		marginVertical: 20,
    marginHorizontal: 10
  },
  link: {
		fontSize: 20,
		color: '#333'
  },
  buttonPanLeft: {
    flex: 1,
    flexWrap: 'wrap', 
    justifyContent : 'flex-start',
    flexDirection:'row',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBackupScreen);
