import React from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiptModalVisible, selectReceipt } from '../actions/receiptActions'
import { formatDate  } from '../functions'
import { getTransactions, refreshTransactions } from '../actions/transactionActions'

const numColumns = 4;

const TransactionList = (props) => {

  const { punched } = props.punched
  const { transactions, refreshing } = props.transactions

  keyExtractor = (trans, index) => index.toString();

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <View style={styles.item} >
        <TouchableOpacity style={{flex: 1, padding: 10}} onPress={() => props.showReceipt(item)}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{alignItems: 'center', height: 45}}>
              {/* <Text>{item.id}</Text> */}
              <Text style={{color: '#666', fontSize: 20, textAlign: 'left'}}>{formatDate(item.datetime)}</Text>
              <Text style={{color: '#333', fontSize: 20}}>Receipt No: {item.receipt_no}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 5}}>
              <Text numberOfLines={3} style={{textAlign: 'center', color: '#333', fontSize: 15}}>
                {
                  item.punched != null?
                  item.punched.map((v, i) => {
                    return v.name.slice(0, 18)
                  }):null
                } 
              </Text>
              <Text style={{textAlign: 'center', color: '#333', fontSize: 20}}>{item.sellPrice}</Text>
            </View>
            <View style={{alignItems: 'center', height: 20}}>
              <Text style={{fontSize: 20, color: '#333', textAlign: 'left'}}>Total: {item.total}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <View style={{flex: 1, margin: 10}}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={transactions}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        onEndReachedThreshold={0.1}
        onEndReached={() => props.getTransactions()}
        onRefresh={ () => props.refreshTransactions() }
        refreshing={refreshing}
      />
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
      dispatch(receiptModalVisible())
      dispatch(selectReceipt(value))
    },
    getTransactions: () => dispatch(getTransactions()),
    refreshTransactions: () => {
      dispatch(refreshTransactions()), 
      dispatch(getTransactions())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);

const styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
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