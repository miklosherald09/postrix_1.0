import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import SettingsNav from '../navigation/SettingsNav'
import { pinChangeVisible, selectUserPin, getUsers } from '../actions/pinActions'
import { userModalVisible, selectUser } from '../actions/usersActions'
import { Card, Avatar, ListItem } from 'react-native-elements'
import { AddButton } from '../components/Common'
import UserModal from  '../components/modals/UserModal'

const SettingsUsersScreen = props => {

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { users } = props.users

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
          <Card 
            title="USERS"
            titleStyle={{fontSize: 20}} >
            {
              users.map((u, i) => {
                return (
                  <TouchableOpacity key={'users-' + i} onPress={() => props.selectUserPin(u)}>
                  <ListItem
                    title={u.name + ' - ' + u.type}
                    titleStyle={{fontSize: 20}}
                    leftAvatar = {
                      <Avatar
                        rounded
                        title={u.type.slice(0, 2)}
                        size="small"
                      />
                    }
                  />
                  </TouchableOpacity>
                );
              })
            }
          </Card>
          <View style={{position: 'absolute', bottom: 0, right: 0, margin: 20}}>
            <AddButton onPress={() => props.addUser(true)}/>
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
    selectUserPin: (val) => {
      dispatch(selectUser(val))
      dispatch(userModalVisible(true))
    },
    addUser: () => dispatch(pinChangeVisible(true)),
    // userModalVisible: () => dispatch(userModalVisible(true))
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUsersScreen);
