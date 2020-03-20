import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements'

export class CloseButton extends React.Component{
  render(){
    return(
      <TouchableHighlight
        style={{alignSelf: 'flex-end', backgroundColor: 'white', padding: 12}}
        onPress={this.props.onPress}>
        <Icon
          name="close"
          size={30}
          color={this.props.color}
        />
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create(
  {
    menuIcon: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center'
    }
  }
);
