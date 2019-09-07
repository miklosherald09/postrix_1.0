import React from 'react'
import { StyleSheet, View, TextInput, NativeModules, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { setBarcodeSearchText, barcodeSeachItem } from '../actions/barcodeSearchActions'
import { Input } from 'react-native-elements'


const MainSearch = (props) => {

  const { searchText } = props.barcodeSearch

  onKeyPress = (e) => {
    if(e.nativeEvent.key == "Enter"){
      e.preventDefault()
      props.setSearchText('')
      props.setSearchItems(searchText)
    }
  }

  onSubmitEditing = (e) => {
    props.setSearchText('')
    props.setSearchItems(searchText)
  }

  onChangeText = (text) => {
    props.setSearchText(text)
  }

  return(
    <View style={styles.container}>
      <Input
        inputStyle={styles.input}
        inputContainerStyle={{borderBottomColor: 'white'}}
        placeholder='barcode'
        onChangeText={ this.onChangeText }
        // onChangeText={ this.SearchItem }
        keyboardType='default'
        onKeyPress={this.onKeyPress}
        onSubmitEditing={this.onSubmitEditing}
        onFocus={() =>  Keyboard.dismiss} 
        // multiline = {true}
        value={searchText}
        autoFocus={true}
        blurOnSubmit={false}
      />
    </View>
  )
}

function mapStateToProps(state) {
	return {
    barcodeSearch: state.barcodeSearch,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchItems: (text) => { dispatch(barcodeSeachItem(text)) },
    setSearchText: (text) => { dispatch(setBarcodeSearchText(text)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);

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