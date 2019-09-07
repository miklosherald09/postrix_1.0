import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { formatData } from '../functions'
import { chargeModalVisible, punchCharge } from '../actions/chargeActions'
import { currency } from '../constants/constants'

const numColumns = 4;

const ChargeList = (props) => {

  const { charges } = props.charge
  keyExtractor = (trans, index) => index.toString();

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <View style={styles.item}>
        <TouchableHighlight style={{flex: 1}} onPress={() => props.punchCharge(item)}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <View style={{flex: 1 }}>
              <Text style={{ textAlign: 'center', fontSize: 20, }}>{item.name}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{ textAlign: 'center', fontSize: 20,  color: '#333'}}>{currency}{item.price}</Text>
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
          data={formatData(charges, numColumns)}
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
    charge: state.charge,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    chargeModalVisible: () => dispatch(chargeModalVisible()),
    punchCharge: (charge) => dispatch(punchCharge(charge))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChargeList);


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