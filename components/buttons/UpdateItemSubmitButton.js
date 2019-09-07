import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';
import { connect,  } from 'react-redux';
import { submit } from 'redux-form';

const UpdateItemSubmitButton = ({ dispatch }) => {
  return (
    <TouchableOpacity onPress={ () => dispatch(submit('UPDATE_ITEM_FORM')) } style={styles.opacity} >
        <Text style={styles.text}>Save</Text>
    </TouchableOpacity>
  );
};

export default connect()(UpdateItemSubmitButton);

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'steelblue', 
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