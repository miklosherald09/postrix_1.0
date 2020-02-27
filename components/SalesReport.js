import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { currency, USER_TYPE_ADMIN, USER_TYPE_ROOT } from '../constants/constants'
import myStyles from '../constants/styles'

const SalesReport = (props) => {

  const { startDate, endDate, totalSales, totalProfit, itemSales, charges, totalCharges } = props.reports
  const { userType } = props.pin

  renderItem = ({item}) => (
    <View style={{flexDirection: 'row', marginBottom: 5}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <View style={{flex: 9}}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.itemName}>
            <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.sellPrice} displayType={'text'} thousandSeparator={true} prefix={currency} />
          </Text>
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text style={styles.itemName}>x{item.count}</Text>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={{fontSize: 20, color: '#333'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.count * item.sellPrice} displayType={'text'} thousandSeparator={true} prefix={currency} />
      </View>
    </View>
  )


  return(
    <View style={styles.wrapper}>
      <View style={styles.itemsField}>
        <View style={{flex: 4}}>
          <Header />
          <View style={{flex: 1}}>
            <FlatList
              style={{flex: 1}}
              keyExtractor={(item, index) => index.toString()}
              data={itemSales}
              renderItem={renderItem}
            />
          </View>
          <SalesSummary totalSales={totalSales} />
          {
            (userType == USER_TYPE_ADMIN || userType == USER_TYPE_ROOT)?
            <ProfitSummary totalProfit={totalProfit}/>:null
          }
        </View>
        <View style={styles.chargesPan}>
          {/* <Text style={myStyles.header}>CHARGES</Text> */}
          <FlatList
            style={{flex: 1}}
            keyExtractor={(item, index) => index.toString()}
            data={charges}
            renderItem={renderItem}
          />
          <ChargesSummary totalCharges={totalCharges}/>
        </View>
      </View>
    </View>
  )
}

function mapStateToProps(state) {
	return {
    reports: state.reports,
    pin: state.pin
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const Header = () => {
  return (
    <View style={{flexDirection: 'row', height: 40}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <View style={{flex: 9}}>
          <Text style={styles.itemName}>ITEM</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.itemName}>PRICE</Text>
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text style={styles.itemName}>QTY</Text>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={styles.itemName}>TOTAL</Text>
      </View>
    </View>
  )
}

const SalesSummary = ({totalSales}) => {
  return (
    <View style={{flexDirection: 'row', marginTop: 20, height: 40}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <Text style={styles.itemName}>TOTAL SALES</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={{fontSize: 20, color: 'black'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalSales} displayType={'text'} thousandSeparator={true} prefix={currency} />
      </View>
    </View>
  )
}

const ProfitSummary = ({totalProfit}) => {
  return (
    <View style={{flexDirection: 'row', height: 40}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <Text style={styles.itemName}>TOTAL PROFIT</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={{fontSize: 20, color: 'black'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalProfit} displayType={'text'} thousandSeparator={true} prefix={currency} />
      </View>
    </View>
  )
}

const ChargesSummary = ({totalCharges}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <Text style={styles.itemName}>TOTAL CHARGES</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={{fontSize: 20, color: 'black'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalCharges} displayType={'text'} thousandSeparator={true} prefix={currency} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  headerField: {
    margin: 10,
  },
  itemName: {
    fontSize: 20,
    color: 'black'
  },
  titleStyle: {
    fontSize: 12,
    color: '#CCC'
  },
  totalSales: {
    fontSize: 15,
    color: '#333'
  },
  totalProfit: {
    fontSize: 18,
    color: '#333'
  },
  itemsField: {
    flex: 1,
    marginBottom: 10,
    margin: 15
  },
  chargesPan: {
    flex: 1,
    borderTopColor: '#EEE',
    borderTopWidth: 1,
    paddingTop: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);
