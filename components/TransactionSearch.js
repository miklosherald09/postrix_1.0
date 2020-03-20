import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import { setSearchText, searchTransactions } from '../actions/transactionActions'

const TransactionSearch = (props) => {

  timer = null
	const onChangeText = (text) => {
		
		clearTimeout(timer);

		timer = setTimeout(function () {
			props.searchTransactions(text)
		}, 500)
  }
  
  const { searchText } = props.transactions

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
        keyboardType='default'
        // placeholder='search'
        onChangeText={ (text) => onChangeText(text) }
        // clearTextOnFocus={true}
        // // focus={itemSearchModalVisible}
        defaultValue={"fsd"}
        // leftIcon={
        //   <Icon
        //     name='search'
        //     size={24}
        //     color='#CCCCCC'
        //   />
        // }
      />
    </View>
  )
}

function mapStateToProps(state) {
	return {
    transactions: state.transactions
	}
}

function mapDispatchToProps(dispatch) {
  return {
    // getTransactions: () => dispatch(getTransactions())
    searchTransactions: (text) => {
			dispatch(setSearchText(text))
			dispatch(searchTransactions(text))
		}
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
)

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSearch)