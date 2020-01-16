import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const CloseButton = ({onPress, color}) =>  {
    return (
      <TouchableOpacity
        style={{margin: 0, paddingHorizontal: 14, alignSelf: 'flex-end'}}
        onPress={ onPress }>
        <Icon
          name="close"
          size={35}
          color={color?color:"#666"}
        />
      </TouchableOpacity>
    );
}

export const CheckButton = ({onPress, color}) =>  {
  return (
    <TouchableOpacity
      style={{margin: 0, paddingHorizontal: 14, alignSelf: 'flex-end'}}
      onPress={ onPress }>
      <Icon
        name="check"
        size={37}
        color={color?color:"#2089DC"}
      />
    </TouchableOpacity>
  );
}

export const AddButton = ({onPress, color}) =>  {
  return (
    <TouchableOpacity
      style={{margin: 0, paddingHorizontal: 14, alignSelf: 'flex-end'}}
      onPress={ onPress }>
      <Icon 
        name="add-circle" 
        size={70}
        color="#2089dc"
      />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  wrapper: {

  },
});
