import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

export default class TransactionSearch extends React.Component{
	render(){
		return(
      <View style={styles.container}>
        <Input
          inputStyle={styles.input}
          inputContainerStyle={{borderBottomColor: null, borderBottomWidth: 0}}
          placeholder='search'
          leftIcon={
            <Icon
              name='search'
              size={24}
              color='#CCCCCC'
            />
          }
        />
      </View>
		)
	}
}

const styles = StyleSheet.create(
  {
    container: {
        flex: 1
    },
    input: {
      backgroundColor: null,
      height: 58,
      paddingLeft: 10,
      borderBottomWidth: 0,
      borderBottomColor: 'white'
    }
  }
);