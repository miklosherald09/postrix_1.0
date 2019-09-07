import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
// import { SettingsNavi } from '../components/SettingsNavi'

const GoogleSheetScreen = props => {

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const navLink = (nav, text) => {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
  }
  
  const { pairedPrinter } = props.settingsPrinter

  return (
    <View style={styles.wrapper}>
      <View style={styles.topMenu}>
        <View style={styles.topMenuLeft}>
          <MenuButton openMenu={openMenu.bind(this)} color="#333333"/>
        </View>
        <View style={styles.topMenuRight}>
        </View>
      </View>
      <View style={styles.wrap}>
        <View style={styles.leftContent}>
          <ScrollView>
            <View style={styles.bottomLinks}>
              {navLink('Settings', 'Settings')}
              {navLink('SettingsPrinter', 'Printer')}
            </View>
          </ScrollView>
        </View>
        <View style={styles.rightContent}>
          <Text>gogle shite screen</Text>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
	return {
		settingsPrinter: state.settingsPrinter,
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSheetScreen);


const styles = StyleSheet.create({
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
  bottomLinks: {
    marginVertical: 20,
    marginHorizontal: 10
  }
});
