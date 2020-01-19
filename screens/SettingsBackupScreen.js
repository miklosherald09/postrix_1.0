import React, { useEffect  } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import SettingsNav from '../navigation/SettingsNav'
import UserModal from  '../components/modals/UserModal'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
// import firebase from 'firebase'
// import auth from '@react-native-firebase/auth'
import { firebase } from '@react-native-firebase/auth';

const SettingsBackupScreen = props => {

  useEffect(() => {

    firebaseConfig = {
      apiKey: 'AIzaSyCRDc0Yth2Q84TjWMX4mWlGShWvcWAJ0w0',
      authDomain: 'postrixc137.firebaseapp.com',
      databaseURL: 'https://postrix-4b28c.firebaseio.com/',
      projectId: 'postrix-4b28c'
    }
    
    // app = firebase.initializeApp(firebaseConfig)

    
    GoogleSignin.configure({
      webClientId: '353265660190-gaaeavueigpmaoavql1ocdq6lrq5hhkt.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    
  })

  const Todos = () => {
    
    return null;
  }

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { users } = props.users

  // const insertUser = () => {
  //   firebase.database() .ref('user/0001').set({
  //     name: 'mik',
  //     age: 21
  //   }).then(() => {
  //     alert('inserted')
  //   }).catch((error) => {
  //     alert(JSON.stringify(error))
  //   })
  // }

  // Somewhere in your code
  const _signIn = async () => {
    alert('pos0')
    try {
      await GoogleSignin.hasPlayServices()
      userInfo = await GoogleSignin.signIn()
      credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
      currentUser = await firebase.auth().signInWithCredential(credential);
      
      alert(JSON.stringify(currentUser));
      alert(JSON.stringify(userInfo))

    } catch (error) {
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
            <Text style={{fontSize: 22, marginBottom: 10}}>Bind postrix to Google account</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <GoogleSigninButton
                style={{ width: 300, height: 60 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                fontSize={30}
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
