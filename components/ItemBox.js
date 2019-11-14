import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { punch } from '../actions/punchedActions'
import { selectItem, showItemColorsModal } from '../actions/itemColorsActions'
import { currency as curr } from '../constants/constants'

const numColumns = 4

const ItemBox = (props) => {

  const bgcolor = (props.item.color != null)?props.item.color:'white'
  const txcolor = (props.item.color != null)?'white':'#666'
  const bdcolor = (props.item.color != null)?'white':'#666'

  return(
    <View style={styles.container}>
      <TouchableHighlight 
        onLongPress={() => props.selectItem(props.item) }
        onPress={() => {props.punch(props.item)}}>
        <View style={{...styles.itemBox, backgroundColor: bgcolor,}}>
          <Text style={{...styles.barcode, color: txcolor}}>{props.item.barcode}</Text>
          <View style={{...styles.namePan, borderBottomColor: bdcolor}}>
            <Text style={{...styles.name, color: txcolor}} numberOfLines={3} ellipsizeMode="tail">{props.item.name}</Text>
          </View>
          <View style={styles.imagePan}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {/* <Image style={{width: 45, height: 45}} source={require('../assets/alfonso.fw.png')}  /> */}
              <Text style={{fontSize: 22, color: txcolor}}>{curr}{props.item.sellPrice}</Text>
            </View>
            {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{width: 45, height: 45}} source={require('../assets/alfonso.fw.png')}  />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>${props.item.sellPrice}</Text>
            </View> */}
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
}

function mapStateToProps(state) {
	return {
    items: state.items,
	}
}

function mapDispatchToProps(dispatch) {
    return {
      punch: (item) => dispatch(punch(item)),
      selectItem: (item) => {
        dispatch(showItemColorsModal()),
        dispatch(selectItem(item))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBox);

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      // marginLeft: 10,
      marginTop: 10,
      marginHorizontal: 5,
    },
    itemBox: {
      // backgroundColor: 'white',
      // width: 120,
      // height: 140,
      height: Dimensions.get('window').height / numColumns, // approximate a square
      borderRadius: 5,
    },
    namePan: {
      flex: 1,
      // backgroundColor: 'red',
      justifyContent: 'center',
      borderBottomColor: '#CCCCCC',
      borderBottomWidth: 1,
      marginHorizontal: 5,
    }, 
    imagePan: {
      flex: 1,
      flexDirection: 'row',
      padding: 2
    },
    name: {
      textAlign: 'center',
      fontSize: 17,
    },
    barcode: {
      textAlign: 'center',
      fontSize: 15,
      color: '#999999',
      marginTop: 5,
    }
  }
);