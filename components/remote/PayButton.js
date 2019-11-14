import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

const PayButton = ({ dispatch }) => {
  return (
    <View style={{padding: 10, margin: 10, marginTop: 50, width: 400}}>
      <TouchableOpacity onPress={
          () => dispatch(submit('PAY_MODAL_FORM'))
        } 
        style={{ margin: 10, alignItems: 'center' }} >
        <Text style={{
            backgroundColor: 'steelblue', color: 'white', fontSize: 20,
            height: 50, width: 200, textAlign: 'center', padding: 10
        }}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default connect()(PayButton);