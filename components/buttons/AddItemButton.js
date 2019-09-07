import React from 'react'
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AddItemBUtton extends React.Component{
  render(){
    return(
      <TouchableHighlight onPress={() => this.props.openModal()}>
        <Icon
          name="plus-circle"
          size={42}
          color="#2B78FE"
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
