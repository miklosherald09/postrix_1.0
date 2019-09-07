import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Picker } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { connectPrinter } from '../actions/settingsPrinterActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import SettingsNav from '../navigation/SettingsNav'

const SettingsPrinterScreen = props => {

	const openMenu = () => {
		props.navigation.openDrawer();
	}

  const navLink = (nav, text) => {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
  }
  
  const { devices, printer, connected } = props.settingsPrinter;

  const pickerChange = (value) => {
    props.connectPrinter(value)
  }

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
          <View style={{margin: 20}}>
            <View>
              <Picker
                selectedValue={printer}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) => pickerChange(itemValue)} >{
                  devices.map( (v, i)=> {
                    return <Picker.Item key={i} label={v.name} value={v.address} />
                  })
                }
              </Picker>
              {
                connected == true?
                <Icon
                  iconStyle={{fontSize: 24, }}
                  name="check"
                  size={24}
                  color={"green"}
                />:
                <Text>Please Open bluetooth and connect printer</Text>
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state){
	return {
		settingsPrinter: state.settingsPrinter,
	}
}

function mapDispatchToProps(dispatch){
  return {
    connectPrinter: (value) => { dispatch(connectPrinter(value)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPrinterScreen);


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
