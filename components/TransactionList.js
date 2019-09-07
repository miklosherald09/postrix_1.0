import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { receiptModalVisible, selectReceipt } from '../actions/receiptActions'
import { formatDate, dump } from '../functions'

const numColumns = 4;

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

  const { punched } = props.punched;
  const { transactions } = props.transactions

  keyExtractor = (trans, index) => index.toString();

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item} >
        <TouchableHighlight style={{flex: 1}} onPress={() => props.showReceipt(item)}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#666', fontSize: 10, }}>{formatDate(item.datetime)}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 5}}>
              <Text style={{textAlign: 'center', color: '#333', fontSize: 12}}>
                {
                  item.punched.map((v, i) => {
                    return v.name
                  })
                } 
              </Text>
              {/* <Text style={{textAlign: 'center', color: '#333', fontSize: 12}}>{item.punched}</Text> */}
              <Text style={{textAlign: 'center', color: '#333', fontSize: 12}}>{item.sellPrice}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 8 }}>Total</Text>
              <Text style={{fontSize: 12, color: '#333'}}>{item.total}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };


  return(
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={{flexWrap: null}}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={formatData(transactions, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </ScrollView>
    </View>
  )
}

function mapStateToProps(state) {
	return {
    punched: state.punched,
    transactions: state.transactions
	}
}

function mapDispatchToProps(dispatch) {
  return {
    showReceipt: (value) => {
      console.log(value)
      dispatch(receiptModalVisible())
      dispatch(selectReceipt(value))
    }
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
    padding: 5,
    height: Dimensions.get('window').height / numColumns, // approximate a square
    borderRadius: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});