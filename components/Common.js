import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CloseButton = (props) =>  {
    return (
      <TouchableOpacity
        style={{margin: 0, padding: 10, alignSelf: 'flex-end'}}
        onPress={ props.onPress }>
        <Icon
          name="close"
          size={30}
          color="#333"
        />
      </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
  wrapper: {

  },
});
