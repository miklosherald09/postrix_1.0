
import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import NumberFormat from 'react-number-format'
import { currency } from '../constants/constants'
import myStyles from '../constants/styles'

const SalesReport = (props) => {

  const { startDate, endDate, totalSales, totalProfit, itemSales, charges, totalCharges } = props.reports

  renderItem = ({item}) => (
    <View>
      <ListItem
        title={
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 9}}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.itemName}>
                <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.sellPrice} displayType={'text'} thousandSeparator={true} prefix={currency} />
              </Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.itemName}>{item.count}</Text>
            </View>
          </View>
        }
        titleStyle={{fontSize: 12, color: '#333'}}
        rightTitle={ <NumberFormat renderText={value => <Text style={{fontSize: 12, color: '#333'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.accruePrice} displayType={'text'} thousandSeparator={true} prefix={currency} />}
        rightTitleStyle={{fontSize: 12}}
        containerStyle={{borderColor: 'black', borderWidth: 0, margin: 2, padding: 5}}
        contentContainerStyle={{flex: 2}}
      />
    </View>
  )

  keyExtractor = (item, index) => index.toString()

  return(
    <View style={styles.wrapper}>
      <ScrollView style={{padding: 10}}>
      <View style={styles.headerField}>
          {/* <Text style={styles.reportDate}>{(startDate)?formatDate(startDate, 1):'Start Date'} - {(endDate)?formatDate(endDate, 1):'End Date'}</Text> */}
          {/* <Text style={styles.totalSales}>
            Total sales: <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalSales} displayType={'text'} thousandSeparator={true} prefix={currency} />
          </Text>
          <Text style={styles.totalProfit}>
            Total profit: <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalProfit} displayType={'text'} thousandSeparator={true} prefix={currency} />
          </Text> */}
        </View>
        <View style={styles.itemsField}>
            {header()}
            <FlatList
              contentContainerStyle={styles.list}
              keyExtractor={this.keyExtractor}
              data={itemSales}
              renderItem={renderItem}
            />
            <ListItem
              containerStyle={{margin: 2, padding: 5}}
              title="TOTAL SALES"
              titleStyle={myStyles.header2}
              rightTitle={ <NumberFormat renderText={value => <Text style={{fontSize: 20, color: 'black'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalSales} displayType={'text'} thousandSeparator={true} prefix={currency} />}>
            </ListItem>
            <ListItem
              containerStyle={{margin: 2, padding: 5}}
              title="TOTAL PROFIT"
              titleStyle={myStyles.header2}
              rightTitle={ <NumberFormat renderText={value => <Text style={{fontSize: 20, color: 'black'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalProfit} displayType={'text'} thousandSeparator={true} prefix={currency} />}>
            </ListItem>
            <View style={styles.chargesPan}>
              <Text style={myStyles.header}>CHARGES</Text>
              <FlatList
                contentContainerStyle={styles.list}
                keyExtractor={this.keyExtractor}
                data={charges}
                renderItem={renderItem}
              />
              <ListItem
                containerStyle={{margin: 2, padding: 5}}
                title="TOTAL CHARGES"
                titleStyle={myStyles.header2}
                rightTitle={ <NumberFormat renderText={value => <Text style={{fontSize: 20, color: 'black'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={totalCharges} displayType={'text'} thousandSeparator={true} prefix={currency} />}>
              </ListItem>
            </View>
        </View>
      </ScrollView>
    </View>
  )
}

function mapStateToProps(state) {
	return {
    reports: state.reports
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);

const header = () => {
  return (
    <ListItem
      title={
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 9}}>
            <Text style={myStyles.header1}>ITEM</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={myStyles.header1}>PRICE</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={myStyles.header1}>QTY</Text>
          </View>
        </View>
      }
      titleStyle={{fontSize: 12}}
      rightTitle="TOTAL"
      rightTitleStyle={myStyles.header1}
      containerStyle={{borderColor: 'black', borderWidth: 0, margin: 2, padding: 5}}
      contentContainerStyle={{ flex: 2}}
    />
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
  container: {
    flex: 1,
    marginVertical: 10,
  },
  headerField: {
    margin: 10,
  },
  itemName: {
    fontSize: 12,
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
    fontSize: 15,
    color: '#333'
  },
  itemsField: {
    marginBottom: 10
  },
  chargesPan: {
    borderTopColor: '#EEE',
    borderTopWidth: 1,
    marginTop: 50
  },
});