import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements'
import { selectShelve } from '../../actions/shelvesActions'

const ShelveButton = (props) => {
  
  return (
    <View style={styles.menuIcon}>
      <Button 
        onPress={() => props.selectShelve(props.shelve)}
        title={props.shelve.name}
        color="#333"
        type="clear"
        titleStyle={{fontSize: 14}}
      />
    </View>
  )
}

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
  return {
    selectShelve: (shelve) => dispatch(selectShelve(shelve)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShelveButton);


const styles = StyleSheet.create({
	menuIcon: {
		flex: 1,
		textAlign: 'center',
		justifyContent: 'center'
	}
});