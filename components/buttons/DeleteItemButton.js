import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { connect,  } from 'react-redux';
import { deleteItem } from '../../actions/itemActions'

const DeleteButton = ({ dispatch }) => {
  return (
    <TouchableOpacity 
      onPress={ () => Alert.alert(
        'Delete Item',
        'Are you sure?',
        [
          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('logout cancelled'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => dispatch(deleteItem())},
        ],
        {cancelable: false},
      )}
      style={styles.opacity}
      >
      <Text style={styles.text}>Delete</Text>
    </TouchableOpacity>
  );
};

export default connect()(DeleteButton);

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'red', 
    color: 'white', 
    fontSize: 16,
    width: 200, 
    textAlign: 'center', 
    padding: 10
  },
  opacity: {
    margin: 10, 
    alignItems: 'center' 
  }
});