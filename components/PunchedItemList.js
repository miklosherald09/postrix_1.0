import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { currency as curr } from '../constants/constants'
import { punchItemVisible, setSelectedItem } from '../actions/punchedActions'


const PunchedItemList = (props) => {

  const { punched } = props.punched

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item}) => (
    <View>
      <TouchableOpacity onPress={ () => props.selectPunchItem(item) }>
        <View style={{flexDirection: 'row', marginBottom: 10 }}>
          <View style={{flex: 2}}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{curr}{item.sellPrice} x {item.count}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemPriceTotal}>
              <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.sellPrice * item.count} displayType={'text'} thousandSeparator={true} prefix={curr} />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )

  return(
    <View style={styles.container}>
      {/* <ScrollView contentContainerStyle={{flexWrap: null}}> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={this.keyExtractor}
          data={punched}
          renderItem={renderItem}
        />
      {/* </ScrollView> */}
    </View>
  )
}

function mapStateToProps(state) {
	return {
		punched: state.punched,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    selectPunchItem: (item) => {
      dispatch(setSelectedItem(item))
      dispatch(punchItemVisible())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PunchedItemList);


const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: null,
      flex: 1,
      paddingTop: 5,
      paddingBottom: 5,
    },
    list: {
      justifyContent: 'center',
      flexDirection: 'column',
    },
    itemName: {
        color: 'black',
        fontSize: 20,
    },
    itemPrice: {
        color: '#2089dc',
        fontSize: 19,
    },
    itemPriceTotal: {
        textAlign: 'right',
        fontSize: 25,
        marginTop: 2,
        color: '#333'
    }
  }
  
);