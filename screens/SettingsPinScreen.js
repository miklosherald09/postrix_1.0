import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { getUsers } from '../actions/pinActions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SettingsNav from '../navigation/SettingsNav'
import { pinChangeVisible, selectUserPin } from '../actions/pinActions'
import { Card, Avatar, ListItem } from 'react-native-elements'
import PinChangeModal from '../components/modals/PinChangeModal'



const SettingsPinScreen = props => {

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { users } = props.pin

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
          
          <Card title="USERS">
            {
              users.map((u, i) => {
                return (
                  <ListItem
                    key={i}
                    title={u.type}
                    onPress={() => props.selectUserPin(u)}
                    leftAvatar = {
                      <Avatar
                        rounded
                        title={u.type.slice(0, 2)}
                        size="small"
                      />
                    }
                  />
                );
              })
            }
          </Card>
        </View>
      </View>
      <PinChangeModal />
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
    getUsers: () => dispatch(getUsers()),
    selectUserPin: (val) => {
      dispatch(selectUserPin(val))
      dispatch(pinChangeVisible(true))
    } 
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
		fontSize: 15,
		color: '#333'
  },
  buttonPanLeft: {
    flex: 1,
    flexWrap: 'wrap', 
    justifyContent : 'flex-start',
    flexDirection:'row',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPinScreen);
