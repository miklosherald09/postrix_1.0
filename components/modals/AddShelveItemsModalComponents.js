import React from 'react'
import { ListItem } from 'react-native-elements'

export const RenderItem = (props) => {

  return (
    <ListItem
      onPress={  props.onPress }
      containerStyle={{borderBottomColor: '#EEE', borderBottomWidth: 1}}
      // leftAvatar={{ source: require('../../assets/alfonso.fw.png') }}
      title={ props.item.name}
      titleStyle={{ color: '#333', fontSize: 15 }}
    />
  )
}