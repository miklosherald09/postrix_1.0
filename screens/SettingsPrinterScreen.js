import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import { connectPrinter, connectUSBPrinter, scanUSBDevices } from '../actions/settingsPrinterActions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SettingsNav from '../navigation/SettingsNav'
import myStyles from '../constants/styles'
import { Button, ListItem } from 'react-native-elements'

const SettingsPrinterScreen = props => {

	const openMenu = () => {
		props.navigation.openDrawer();
	}
  
  const { devices, connected, connecting, usbDevices, usbDeviceConnecting, usbDeviceConnected } = props.settingsPrinter;

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
            <View style={styles.containerBox}>
              <View style={{flexDirection: 'row', height: 30}}>
                <Icon 
                  name="bluetooth"
                  size={25}
                  color="#2089dc"
                  style={{marginRight: 5}}
                />
                <Text style={myStyles.header2}> BLUETOOTH DEVICES</Text>
              </View>
              <View style={{marginVertical: 20, flex: 1}}>
                <ScrollView>
                  {
                    devices.map( (v, i)=> {
                      return <Device key={i} device={v} onPress={() => props.connectPrinter(v)}/>
                    })
                  }
                </ScrollView>
              </View>
              <View style={{marginLeft: 10, height: 20}}>
                {(connected == true && connecting == false)?<Text style={{color: 'green'}}>Connected</Text>:null}
                {(connected == false && connecting == false)?<Text>Open bluetooth and connect printer</Text>:null}
                {(connecting == true)?<Text style={{color: 'green'}}>connecting...</Text>:null}
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.containerBox} >
              <View style={{height: 30, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <ListItem 
                    title={'USB DEVICES'} 
                    titleStyle={myStyles.header2}
                    leftIcon={<Icon 
                      name='usb'
                      size={25}
                    />}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Button
                    type="clear"
                    icon={<Icon 
                      name='sync'
                      size={25} />}
                    onPress={() => props.scanUSBDevices()}
                  />
                </View>
              </View>
              <View style={{flex: 1, marginVertical: 20}}>
                <ScrollView>
                  {
                    usbDevices.map( (v, i)=> {
                      return <USBDevice key={i} device={v} count={i} onPress={() => props.connectUSBPrinter(v)}/>
                    })
                  }
                </ScrollView>
              </View>
              <View style={{height: 20, marginLeft: 10}}>
                {(usbDeviceConnected == true && usbDeviceConnecting == false)?<Text style={{color: 'green'}}>Connected</Text>:null}
                {(usbDeviceConnected == false && usbDeviceConnecting == false)?<Text>Connect USB printer</Text>:null}
                {(usbDeviceConnecting == true)?<Text style={{color: 'green'}}>connecting...</Text>:null}
              </View>
            </View>
          </View>
          <View style={{height: 10}}></View>
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

class USBDevice extends React.Component{
  render(){
    return (
      <View style={{flexDirection: 'row', marginBottom: 10}} >
        <Button
          title={'USB Device ' + this.props.count}
          titleStyle={{textAlign: 'left', fontSize: 15, fontWeight: 'normal', color: '#2089dc', marginRight: 10}}
          onPress={this.props.onPress}
          type="clear"
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
    connectPrinter: (value) => { dispatch(connectPrinter(value)) },
    connectUSBPrinter: (value) => { dispatch(connectUSBPrinter(value)) },
    scanUSBDevices: ()  => { dispatch(scanUSBDevices()) }
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
    flex: 1,
  },
  containerBox: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPrinterScreen);

