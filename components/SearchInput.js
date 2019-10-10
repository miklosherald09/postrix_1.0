import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { searchItem, modalVisible, setSearchText } from '../actions/itemSearchActions'
import { Input } from 'react-native-elements'

const SearchInput = (props) => {

  const { searchText, itemSearchModalVisible } = props.itemSearch

  onChangeText = (text) => {
    props.setSearchText(text)
    props.searchItem(text)
  }

  return(
    <View style={styles.container}>
      <Input
        // onFocus={ () => props.modalVisible() }
        inputStyle={styles.input}
        inputContainerStyle={{borderBottomColor: 'white'}}
        placeholder='search'
        onChangeText={ this.onChangeText }
        keyboardType='default'
        clearTextOnFocus={true}
        focus={itemSearchModalVisible}
        // onKeyPress={this.onKeyPress}
        defaultValue={searchText}
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

function mapStateToProps(state) {
	return {
    itemSearch: state.itemSearch,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    modalVisible: () => { dispatch(modalVisible()) },
    searchItem: () => dispatch(searchItem()),
    setSearchText: (text) => dispatch(setSearchText(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);

const styles = StyleSheet.create(
  {
    container: {
      // backgroundColor: "blue",
    },
    input: {
      // backgroundColor: 'blue',
      height: 58,
      paddingLeft: 10,
      borderBottomWidth: 0,
      borderBottomColor: 'white',
    }
  }
);