import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { currency, USER_TYPE_ADMIN, USER_TYPE_ROOT } from '../constants/constants'
import myStyles from '../constants/styles'
import { Divider } from 'react-native-elements';

const TaxReport = (props) => {

  const { totalSales, totalProfit, itemSales, charges, totalCharges, totalDiscount, totalTax, taxes } = props.reports
  const { userType } = props.pin

  renderItem = ({item}) => (
    <View style={{flexDirection: 'row', marginBottom: 5}}>
      <View style={{flex: 3, flexDirection: 'row'}}>
        <View style={{flex: 9}}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.itemName}>
            <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.sellPrice} displayType={'text'} thousandSeparator={true} prefix={''} />
          </Text>
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text style={styles.itemName}>x{item.count}</Text>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <NumberFormat renderText={value => <Text style={{fontSize: 20, color: '#333'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.amount} displayType={'text'} thousandSeparator={true} prefix={''} />
      </View>
    </View>
  )

  return(
    <View style={styles.wrapper}>
      <View style={{flexDirection: 'row'}}>
        {/* <View style={{flex: 1}}>
          <TotalSales totalSales={totalSales} />
        </View>
        {
          (userType == USER_TYPE_ADMIN || userType == USER_TYPE_ROOT)?
          <View style={{flex: 1}}>
            <TotalProfit totalProfit={totalProfit}/>
          </View>:null
        }
        <View style={{flex: 1}}>
          <TotalDiscount totalDiscount={totalDiscount} />
        </View>
        <View style={{flex: 1}}>
          <ChargesSummary totalCharges={totalCharges}/>
        </View>
        <View style={{flex: 1}}>
          <TotalTax totalTax={totalTax} />
        </View> */}
      </View>
      <View style={{flex: 1, marginVertical: 0}}>
        <Header />
        <FlatList
          style={{flex: 1}}
          keyExtractor={(item, index) => index.toString()}
          data={[...taxes || []]}
          renderItem={renderItem}
        />
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
        <View style={{flex: 2}}>
          <Text style={styles.header}>NAME</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.header}>DISCOUNT APPLIED</Text>
        </View>
        {/* <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text style={styles.header}>TOTAL</Text>
        </View> */}
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={styles.header}>TOTAL</Text>
      </View>
    </View>
  )
}

const TotalSales = ({totalSales}) => {
  return (
    <View style={{}}>
      <Text style={styles.label}>SALES</Text>
      <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalSales} displayType={'text'} thousandSeparator={true} prefix={currency} />
    </View>
  )
}

const TotalProfit = ({totalProfit}) => {
  return (
    <View>
      <Text style={styles.label}>PROFIT</Text>
      <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalProfit} displayType={'text'} thousandSeparator={true} prefix={currency} />
    </View>
  )
}

const TotalTax = ({totalTax}) => {
  return (
    <View>
      <Text style={styles.label}>TOTAL TAX</Text>
      <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalTax} displayType={'text'} thousandSeparator={true} prefix={currency} />
    </View>
  )
}

const TotalDiscount = ({totalDiscount}) => {
  return (
    <View>
      <Text style={styles.label}>DISCOUNT</Text>
      <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalDiscount} displayType={'text'} thousandSeparator={true} prefix={currency} />
    </View>
  )
}

const ChargesSummary = ({totalCharges}) => {
  return (
    <View>
      <Text style={styles.label}>CHARGES</Text>
      <NumberFormat renderText={value => <Text style={myStyles.header2}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalCharges} displayType={'text'} thousandSeparator={true} prefix={currency} />
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
    padding: 20
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
  header: {
    fontSize: 20,
    color: '#999'
  },
  label: {
    fontSize: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaxReport)
