import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class MenuButton extends React.Component{

    render(){
			return(
			<View style={styles.btnContainer}>
        <Icon 
          name="bars"
          color={this.props.color?this.props.color:"black"}
          size={30}
          containerStyle={styles.menuIcon}
          onPress={() => this.props.openMenu()}
        />
			</View>
		)
	}
}

const styles = StyleSheet.create(
  {
    menuIcon: {
      zIndex: 9,
    },
    btnContainer: {
      padding: 12,
      paddingHorizontal: 15
    },
  }
);