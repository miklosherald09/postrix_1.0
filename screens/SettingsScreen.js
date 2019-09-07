import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import SettingsNav from '../navigation/SettingsNav'
import { updateGoogleSheetUrl, updateGoogleSheetUrlCsv } from '../actions/settingsActions';
import { deleteAllItems } from '../actions/itemActions'
import Icon from 'react-native-vector-icons/FontAwesome5'



const settingsScreen = props => {


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
  
  const { googleSheetUrl, googleSheetUrlCsv } = props.settings

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
          <SettingsNav />
        </View>
        <View style={styles.rightContent}>
          
        </View>
      </View>
    </View>
  );
}



function mapStateToProps(state) {
	return {
    settingsPrinter: state.settingsPrinter,
    settings: state.settings,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    updateGoogleSheetUrl: (text) => dispatch(updateGoogleSheetUrl(text)),
    updateGoogleSheetUrlCsv: (text) => dispatch(updateGoogleSheetUrlCsv(text)),
    deleteAllItems: () => dispatch(deleteAllItems()),
  }
}




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
  navLinks: {
		marginVertical: 20,
    marginHorizontal: 10
  },
  link: {
		fontSize: 15,
		color: '#333'
	}
});


export default connect(mapStateToProps, mapDispatchToProps)(settingsScreen);
