import React, { useEffect  } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import SettingsNav from '../navigation/SettingsNav'
import UserModal from  '../components/modals/UserModal'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
import { authGoogleSignIn, bindGoogleAccount, unbindGoogleAccount, backupData } from '../actions/cloudActions'


const SettingsBackupScreen = props => {

  // useEffect(() => {

  //   firebaseConfig = {
  //     apiKey: 'AIzaSyCRDc0Yth2Q84TjWMX4mWlGShWvcWAJ0w0',
  //     authDomain: 'postrixc137.firebaseapp.com',
  //     databaseURL: 'https://postrix-4b28c.firebaseio.com/',
  //     projectId: 'postrix-4b28c'
  //   }

  //   GoogleSignin.configure({
  //     webClientId: '353265660190-gaaeavueigpmaoavql1ocdq6lrq5hhkt.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //   });
  // })

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { account } = props.users


  const getUsers = async () => {
    // Read the document for user 'Ada Lovelace':
    const documentSnapshot = await firestore()
      .collection('users')
      .doc('1')
      .collection('transactions')
      .get()

      documentSnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data())
    });
  }

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
            <View style={{flex: 1}}>
              {
                account.user.email?
                  <GoogleUnbindButton onPress={props.unbindGoogleAccount} account={account}/>:
                  <GoogleBindButton onPress={props.authGoogleSignIn} account={account}/>
              }
            </View>
            <View style={{flex: 3, flexDirection: 'row'}}>
              {
                !account.user.email?
                <BackupButton onPress={() => props.backupData()} />:null
              }
            </View>
          </View>
          {/* <Text style={{fontSize: 22, marginBottom: 10}}>All data will be saved on google cloud service</Text> */}
        </View>
      </View>
      <UserModal />
    </View>
  );
}

const GoogleBindButton = (props) => {
  return (
      <GoogleSigninButton
        style={{ width: 300, height: 60 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        fontSize={30}
        onPress={props.onPress}
        disabled={props.account.user.name?true:false} />
  )
}


const GoogleUnbindButton = (props) => {
  return (
    <ListItem
      key={i}
      leftAvatar={{ source: { uri: props.account.user.photo } }}
      title={props.account.user.name}
      subtitle={props.account.user.email}
      bottomDivider
      rightTitle={
        <Button 
          title={'Unbind Account'}
          titleStyle={{fontSize: 20, marginLeft: 10}}
          onPress={props.onPress} 
        />
      }
    />
  )
}

const BackupButton = (props) => {
  return (
    <Button
      onPress={props.onPress}
      title={'Backup system'}
      type="solid"
      titleStyle={{fontSize: 20, marginLeft: 10}}
      icon={<Icon 
        name="sync"
        size={22}
        color="white"
      />}
    />
  )
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
    bindGoogleAccount: (account) => dispatch(bindGoogleAccount(account)),
    unbindGoogleAccount: () => dispatch(unbindGoogleAccount()),
    authGoogleSignIn: () => dispatch(authGoogleSignIn()),
    backupData: () => dispatch(backupData())
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
