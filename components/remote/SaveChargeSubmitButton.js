import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const SaveChargeSubmitButton = ({ dispatch }) => {
  return (
    <Button
      onPress={ () => dispatch(submit('ADD_ITEM_FORM')) } 
      style={styles.opacity} 
      title="Save" 
    />
  );
};

export default connect()(SaveChargeSubmitButton);

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