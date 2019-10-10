import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { connectPrinter } from '../actions/settingsPrinterActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import SettingsNav from '../navigation/SettingsNav'
import myStyles from '../constants/styles'
import { Button } from 'react-native-elements'

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
  
  const { devices, printer, connected, connecting } = props.settingsPrinter;

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
          <View style={styles.container}>
            
            <View style={{flexDirection: 'row', }}>
              <Icon 
                name="bluetooth"
                size={25}
                color="#2089dc"
                style={{marginRight: 5}}
              />
             <Text style={myStyles.header2}> BLUETOOTH DEVICES</Text>
            </View>
            <View style={{marginVertical: 20}}>
              <ScrollView>
                {
                  devices.map( (v, i)=> {
                    return <Device key={i} device={v} onPress={() => props.connectPrinter(v)}/>
                  })
                }
              </ScrollView>
            </View>
            <View style={{marginLeft: 10}}>
              {
                (connected == true)?
                <Text style={{color: 'green'}}>Connected</Text>:
                <Text>{connecting == false?'Please Open bluetooth and connect printer':null}</Text>
              }
              {
                 connecting?<Text style={{color: 'green'}}>connecting...</Text>:null
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

class Device extends React.Component{
  render(){
    return (
      <View style={{flexDirection: 'row', marginBottom: 10}} >
        <Button
          title={this.props.device.name}
          titleStyle={{textAlign: 'left', fontSize: 15, fontWeight: 'normal', color: '#2089dc', marginRight: 10}}
          onPress={this.props.onPress}
          type="clear"
          iconRight
          icon={
            <Icon
              name="wifi"
              size={22}
              color="#2089dc"
            />
          }
        />
      </View>
    )
  }
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
  },
  container: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    paddingBottom: 50 
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPrinterScreen);

