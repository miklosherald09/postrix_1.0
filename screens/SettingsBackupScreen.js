import React, { useEffect  } from 'react'
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native'
import moment, { HTML5_FMT } from 'moment'
import { Button, ListItem, Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import SettingsNav from '../navigation/SettingsNav'
import UserModal from  '../components/modals/UserModal'
import { GoogleSigninButton } from '@react-native-community/google-signin'
import { backupData, restoreBackup, rbSuccessModalVisible, bkSuccessModalVisible } from '../actions/settingsBackupActions'
import { authGoogleSignIn, bindGoogleAccount, unbindGoogleAccount } from '../actions/cloudActions'

const SettingsBackupScreen = props => {

	openMenu = () => {
		props.navigation.openDrawer()
  }

  const { account } = props.users
  const { backups, backingUp, restoringBackup, rbSuccessModalVisible, bkSuccessModalVisible } =  props.settingsBackup

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
            <View style={{flex: 3}}>
              <View style={{height: 100}}>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {
                    account.user.email?
                    <BackupButton backingUp={backingUp} onPress={() => props.backupData()} />:null
                  }
                </View>
              </View>
              <FlatList
                keyExtractor={(x, i) => String(i)}
                data={backups}
                style={styles.container}
                renderItem={({item}) => <BackupItem item={item}  restoreBackup={() => props.restoreBackup(item.path)}/>}
                numColumns={1}
              />
              {/* <Text style={{fontSize: 20}}>rbSuccessModalVisible: {rbSuccessModalVisible?'true':'false'}</Text> */}
              <Text style={{fontSize: 20, color: '#2089dc'}}>{restoringBackup?'Saving backup data...':''}</Text>
            </View>
          </View>
          {/* <Text style={{fontSize: 22, marginBottom: 10}}>All data will be saved on google cloud service</Text> */}
        </View>
      </View>
      <UserModal />
      <RestoreSuccessOverlay visible={rbSuccessModalVisible} onBackdropPress={() => props.rbSuccessModalVisible(false)}/>
      <BackupSuccessOverlay visible={bkSuccessModalVisible} onBackdropPress={() => props.bkSuccessModalVisible(false)}/>
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
      title={!props.backingUp?'Backup system':'Saving data to cloud...'}
      type="solid"
      titleStyle={{fontSize: 20, marginLeft: 10}}
      icon={props.backingUp?<Icon 
        name="sync"
        size={22}
        color="white"
      />:<Icon 
      name="cloud"
      size={22}
      color="white"
    />}
    />
  )
}

const BackupItem = (props) => {
  let name = moment(parseInt(props.item.name.substring(0, props.item.name.length-3))).format('LLL')
  return (
    <ListItem
      key={String(props.item.name)+'bi'}
      title={name}
      titleStyle={{ fontSize: 20, color: '#333' }}
      containerStyle={{padding: 10, marginBottom: 5, borderRadius: 4}}
      rightTitle={
        <Button
          onPress={props.restoreBackup}
          type="solid"
          icon={
            !props.restoringBackup?<Icon
              color="white"
              name="sync"
              size={20}
            />:null
          }
        />
      }
    />
  );
}

const RestoreSuccessOverlay = (props) => {
  return (
    <Overlay
      isVisible={props.visible}
      width="50%"
      height="50%"
      onBackdropPress={props.onBackdropPress}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="#2089dc">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button
          onPress={props.onBackdropPress}
          title={"Data Restore Success!"}
          titleStyle={{fontSize: 22, textAlign: 'center', marginLeft: 20}}
          icon={
            <Icon
              name="check-circle"
              size={80}
              color="#039BE5"
            />
          }
        />
      </View>
    </Overlay>
  )
}

const BackupSuccessOverlay = (props) => {
  return (
    <Overlay
      isVisible={props.visible}
      width="50%"
      height="50%"
      onBackdropPress={props.onBackdropPress}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="#2089dc">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button
          onPress={props.onBackdropPress}
          title={"Cloud Data Backup Success!"}
          titleStyle={{fontSize: 22, textAlign: 'center', marginLeft: 20}}
          icon={
            <Icon
              name="check-circle"
              size={80}
              color="#039BE5"
            />
          }
        />
      </View>
    </Overlay>
  )
}

function mapStateToProps(state) {
	return {
    pin: state.pin,
    users: state.users,
    settingsBackup: state.settingsBackup
	}
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
    bindGoogleAccount: (account) => dispatch(bindGoogleAccount(account)),
    unbindGoogleAccount: () => dispatch(unbindGoogleAccount()),
    authGoogleSignIn: () => dispatch(authGoogleSignIn()),
    backupData: () => dispatch(backupData()),
    restoreBackup: (path) => {
        Alert.alert(
          'Restore System Data',  'All current data will be deleted. Restore data anyways?', [{
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => dispatch(restoreBackup(path))}],
          {cancelable: false}, )
      
    },
    rbSuccessModalVisible: (visible) => dispatch(rbSuccessModalVisible(visible)),
    bkSuccessModalVisible: (visible) => dispatch(bkSuccessModalVisible(visible))
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
