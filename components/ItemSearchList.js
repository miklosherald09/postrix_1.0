import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, Dimensions, TouchableHighlight, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { modalClose, searchItem } from '../actions/itemSearchActions'
import { currency } from '../constants/constants'
import { punch } from '../actions/punchedActions'

const numColumns = 5;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const TransactionList = (props) => {

  const { searchItems, request } = props.itemSearch;

  keyExtractor = (trans, index) => index.toString();

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item} >
        <TouchableHighlight style={{flex: 1}} onPress={() => props.punch(item)}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, }}>
              <Text style={{fontSize: 20, color: '#333', textAlign: 'center'}}>{item.name}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{fontSize: 20,  color: '#333', textAlign: 'center'}}>{currency+' '+item.sellPrice}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  renderFooter = () => {
    return(
      request.refreshing?
      <View style={{marginTop: 10, alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>:null
    )
  }

  return(
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={{flexWrap: null}}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={formatData(searchItems, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
          onEndReachedThreshold={0.1}
          // onEndReached={() => props.searchItem()}
          ListFooterComponent={this.renderFooter}
        />
      </ScrollView>
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
    closeModal: () => dispatch(modalClose()),
    punch:(item) => {
      dispatch(modalClose())
      dispatch(punch(item))
    },
    searchItem: () => dispatch(searchItem())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);


const styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    flex: 1,
    marginVertical: 10,
    margin: 10
  },
  item: {
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    margin: 5,
    padding: 10,
    height: Dimensions.get('window').height / numColumns + 20, // approximate a square
    borderRadius: 5,
    borderColor: '#CCC',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});