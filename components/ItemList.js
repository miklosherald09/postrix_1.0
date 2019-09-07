import React from 'react'
import { StyleSheet, View, FlatList, ScrollView, Text } from 'react-native'
import ItemBox from '../components/ItemBox'
import { connect } from 'react-redux'

let styles;

const ItemList = (props) => {

  const { shelve } = props.shelves;
  const { container, list	} = styles
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => (
    <ItemBox item={item} />
  )

  return(
    <View style={container}>
      <ScrollView contentContainerStyle={{flexWrap: 'wrap'}}>
        <FlatList
          contentContainerStyle={list}
          keyExtractor={keyExtractor}
          data={shelve.items}
          renderItem={renderItem}
          numColumns={4}
          initialNumToRender={50}
        />
      </ScrollView>
    </View>
  )
}

function mapStateToProps(state) {
	return {
    items: state.items,
    shelves: state.shelves
	}
}

function mapDispatchToProps(dispatch) {
  return {
    setModalVisible: () => dispatch({ type: 'ADDITEM_MODAL_VISIBLE' }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);

styles = StyleSheet.create(
  {
    container: {
      backgroundColor: null,
      flex: 1,
      flexDirection: 'column',
    },
    list: {
      justifyContent: 'center',
      flexDirection: 'column',
    }
  }
);