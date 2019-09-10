import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { chargeModalVisible, punchCharge, getCharges,saveChargeModalVisible, selectCharge } from '../actions/chargeActions'
import { currency } from '../constants/constants'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

numColumns = 4

const ChargeList = (props) => {

  const { charges } = props.charge
  keyExtractor = (trans, index) => index.toString();

  renderItem = ({ item, index }) => {

    switch(item.type){
      case 'EMPTY': {
        return (
          <View style={[styles.item, styles.itemInvisible]} />
        )
      }
      case 'ADD_BUTTON': {
        return(
          <AddButton onPress={() => {
            props.saveChargeModalVisible(true),
            props.selectCharge({id: null, name: '', price: ''})
          }}/>
        )
      }
      default: {
        return(
          <View style={styles.item}>
            <TouchableOpacity 
              style={{flex: 1}}
              onPress={() => props.punchCharge(item)}
              onLongPress={() => { props.saveChargeModalVisible(true), props.selectCharge(item)}} >
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <View style={{flex: 1 }}>
                  <Text style={{ textAlign: 'center', fontSize: 20, }}>{item.name}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{ textAlign: 'center', fontSize: 20,  color: '#333'}}>{currency}{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    }
  };

  return(
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={{flexWrap: null}}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={charges}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
          onEndReached={() => props.getCharges()}
        />
      </ScrollView>
    </View>
  )
}

class AddButton extends React.Component{
  render(){
    return (
      <View style={styles.buttonPanWrap}>
        <TouchableOpacity
          style={styles.buttonPan}
          onPress={this.props.onPress}>
          <Icon
            name="plus"
            size={60}
            color="#CACAD9"
          />
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
	return {
    charge: state.charge,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    chargeModalVisible: () => dispatch(chargeModalVisible()),
    punchCharge: (charge) => dispatch(punchCharge(charge)),
    getCharges: () => dispatch(getCharges()),
    saveChargeModalVisible: (v) => dispatch(saveChargeModalVisible(v)),
    selectCharge: (v) => dispatch(selectCharge(v))
  }
}

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
  buttonPanWrap: {
    flex: 1,
    margin: 5,
    padding: 5,
    height: Dimensions.get('window').height / numColumns, // approximate a square
    borderRadius: 5,
    backgroundColor: '#BCBCCF',
    justifyContent: 'center',
  },
  buttonPan: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    margin: 5,
    padding: 5,
    height: Dimensions.get('window').height / numColumns, // approximate a square
    borderRadius: 5,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ChargeList);