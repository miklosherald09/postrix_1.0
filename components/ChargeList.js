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
  const { userType } = props.pin

  renderItem = ({ item, index }) => {

    switch(item.type){
      case 'EMPTY': {
        return (
          <View style={[styles.item, styles.itemInvisible]} />
        )
      }
      case 'ADD_BUTTON': {
        
        return(
          (userType == 'ROOT' || userType == 'ADMIN')?
          <AddButton onPress={() => {
            props.saveChargeModalVisible(true),
            props.selectCharge({id: null, name: '', price: ''})
          }}/>:
          <View style={[styles.item, styles.itemInvisible]} />
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
                  <Text style={{ textAlign: 'center', fontSize: 25, paddingTop: 10 }}>{item.name}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{ textAlign: 'center', fontSize: 25,  color: '#333'}}>{currency}{item.price}</Text>
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
      <FlatList
        keyExtractor={(trans, index) => index.toString()}
        data={charges}
        style={{flex: 1, margin: 10}}
        renderItem={this.renderItem}
        numColumns={numColumns}
        onEndReached={() => props.getCharges()}
      />
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
    pin: state.pin,
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
    flex: 1
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