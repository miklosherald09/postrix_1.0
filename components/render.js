import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

export const renderInput = ({
  label, 
  type,
  textAlign,
  keyboardType, 
  meta: { touched, error, warning }, 
  inputContainerStyle, 
  input: {onChange, ...restInput }}) => {

  return (
    <View>
      <Input
        type={type}
        style={styles.input} 
        keyboardType={keyboardType}
        onChangeText={onChange}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        inputContainerStyle={inputContainerStyle}
        placeholder={label}
        {...restInput}
        textAlign={textAlign}
      />
      {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
      (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
    </View>
  )
}

const styles = StyleSheet.create({
 
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
	containerStyle: {
		paddingHorizontal: 0,
  },
  
});

