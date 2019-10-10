import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CloseButton = ({onPress, color}) =>  {
    return (
      <TouchableOpacity
        style={{margin: 0, padding: 10, alignSelf: 'flex-end'}}
        onPress={ onPress }>
        <Icon
          name="close"
          size={30}
          color={color?color:"#999"}
        />
      </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
  wrapper: {

  },
});
