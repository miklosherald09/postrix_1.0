import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { currency, USER_TYPE_ADMIN, USER_TYPE_ROOT } from '../constants/constants'
import myStyles from '../constants/styles'
import { Divider } from 'react-native-elements';

const SalesReport = (props) => {

  const { startDate, endDate, totalSales, totalProfit, itemSales, charges, totalCharges, totalDiscount, totalTax } = props.reports
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
          <TotalTax totalTax={totalTax} />
          <TotalDiscount totalDiscount={totalDiscount} />
          <TotalSales totalSales={totalSales} />
          {
            (userType == USER_TYPE_ADMIN || userType == USER_TYPE_ROOT)?
            <TotalProfit totalProfit={totalProfit}/>:null
          }
        </View>
        <Divider style={{margin: 10}}/>
        <View style={styles.chargesPan}>
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
          <Text style={myStyles.header1}>ITEM</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={myStyles.header1}>PRICE</Text>
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text style={myStyles.header1}>QTY</Text>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={myStyles.header1}>TOTAL</Text>
      </View>
    </View>
  )
}

const TotalSales = ({totalSales}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <Text style={myStyles.header2}>TOTAL SALES</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalSales} displayType={'text'} thousandSeparator={true} prefix={currency} />
      </View>
    </View>
  )
}

const TotalProfit = ({totalProfit}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <Text style={myStyles.header2}>TOTAL PROFIT</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalProfit} displayType={'text'} thousandSeparator={true} prefix={currency} />
      </View>
    </View>
  )
}

const TotalTax = ({totalTax}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <Text style={myStyles.header2}>TOTAL TAX</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalTax} displayType={'text'} thousandSeparator={true} prefix={currency} />
      </View>
    </View>
  )
}

const TotalDiscount = ({totalDiscount}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <Text style={myStyles.header2}>TOTAL DISCOUNT</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalDiscount} displayType={'text'} thousandSeparator={true} prefix={currency} />
      </View>
    </View>
  )
}


const ChargesSummary = ({totalCharges}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <Text style={myStyles.header2}>TOTAL CHARGES</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalCharges} displayType={'text'} thousandSeparator={true} prefix={currency} />
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);
