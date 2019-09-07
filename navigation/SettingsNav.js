import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation';

class SettingsNav extends React.Component{

  navLink = (nav, text) => {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
  }

  render(){ 
    return(
      <ScrollView>
        <View style={styles.navLinks}>
          {this.navLink('Settings', 'Basic')}
          {this.navLink('SettingsItems', 'Items')}
          {this.navLink('SettingsPrinter', 'Printer')}
          {this.navLink('ReportSetup', 'Reports')}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  navLinks: {
		marginVertical: 20,
    marginHorizontal: 10
  },
  link: {
		fontSize: 15,
		color: '#333'
	}
});

export default withNavigation(SettingsNav)
