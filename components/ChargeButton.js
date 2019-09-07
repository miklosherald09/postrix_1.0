import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'

const ChargeButton = props => {
    return(
      <View style={styles.wrapper}>
        <TouchableHighlight onPress={() => alert('xx')}>
          <View style={styles.button}>
            <Icon
              name='plus'
              size={20}
              color='white' />
          </View>
        </TouchableHighlight>
      </View>
    )
}


function mapStateToProps(state) {
	return {
    items: state.items,
	}
}

function mapDispatchToProps(dispatch) {
    return {
      setModalVisible: () => dispatch({ type: 'ADDITEM_MODAL_VISIBLE' }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChargeButton);


const styles = StyleSheet.create(
  {
    wrapper: {
      margin: 10,
      width: 42,
      height: 42,
    },
    button: {
      backgroundColor: "#0070C0",
      width: 40,
      height: 40,
      borderRadius: 20,
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }
);