import React from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, ActivityIndicator, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NumberFormat from 'react-number-format'
import { currency as curr } from '../constants/constants'
import { punch } from '../actions/punchedActions'
import { updateItemModalVisible, setItemInput } from '../actions/itemActions'
import { selectItem, showItemColorsModal } from '../actions/itemColorsActions'
import { addShelveItemsVisible, getOptions, getShelveItems, getShelveItemsRefresh, refreshOptions } from '../actions/shelvesActions'
import { playBeepSound } from '../functions'

const  numColumns  = 4

const ShelveItemsList = (props) => {

  const { items, request } = props.shelves

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => {

    const bgcolor = (item.color != null)?item.color:'white'
    const txcolor = (item.color != null)?'white':'#333'
    const bdcolor = (item.color != null)?'white':'#ECECFB'
    
    if(item.empty === true) {
      if(item.isButton === true){
        return  <AddShelveItemsButton onPress={() => props.addShelveItemsVisible()}/>
      }
      else
        return <View style={[styles.item, styles.itemInvisible]} />;
    }
    else{
      return (
        <View style={styles.itemBoxPan}>
          <TouchableHighlight
            onLongPress={() => props.selectItem(item) }
            onPress={() => {props.punch(item)}} >
            <View style={{...styles.itemBox, backgroundColor: bgcolor,}}>
              <Text style={{...styles.barcode, color: txcolor}}>{item.barcode}</Text>
              <View style={{...styles.namePan, borderBottomColor: bdcolor}}>
                <Text style={{...styles.name, color: txcolor}} numberOfLines={3} ellipsizeMode="tail">{item.name}</Text>
              </View>
              <View style={styles.imagePan}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 20, color: txcolor}}>
                    <NumberFormat renderText={value => <Text>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.sellPrice} displayType={'text'} thousandSeparator={true} prefix={curr} />
                  </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      )
    }
  };

  renderFooter = () => {
    return(
      request.refreshing?
      <View style={{marginTop: 10, alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>:null
    )
  }

  return(
    <View style={{flex: 1, margin: 10}}>
      {/* <Text>refreshing: {request.refreshing?'true':'false'}</Text> */}
      <FlatList
        keyExtractor={this.keyExtractor}
        data={items}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={4}
        // initialNumToRender={15}
        onEndReached={() => props.getShelveItems()}
        onEndReachedThreshold={0.1}
        onRefresh={() => props.handleRefresh()}
        refreshing={request.refreshing}
        // ListFooterComponent={this.renderFooter}
      />
    </View>
  )
}


class AddShelveItemsButton extends React.Component{
  render(){
    return (
      <View style={{ flex: 1,
        justifyContent: 'center',
        backgroundColor: '#BCBCCF',
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        height: Dimensions.get('window').height / numColumns}}>
        <Button
          onPress={this.props.onPress}
          buttonStyle={{height: Dimensions.get('window').height / numColumns}}
          type="clear"
          icon={<Icon
            name= "plus"
            size= {50}
            color = '#CACAD9'
          />}
        />
      </View>
    )
  }
}


function mapStateToProps(state) {
	return {
    shelves: state.shelves
	}
}

function mapDispatchToProps(dispatch) {
  return {
    punch: (item) => {
      playBeepSound(),
      dispatch(punch(item))
    },
    selectItem: (item) => {
      dispatch(showItemColorsModal()),
      dispatch(selectItem(item))
    },
    openModal: (item) => { 
      dispatch(setItemInput(item)),
      dispatch(updateItemModalVisible()) 
    },
    addShelveItemsVisible: () => {
      dispatch(addShelveItemsVisible())
      dispatch(refreshOptions())
      dispatch(getOptions())
    },
    getShelveItems: () => {
      dispatch(getShelveItems())
    },
    handleRefresh: () => {
      dispatch(getShelveItemsRefresh())
      dispatch(getShelveItems())
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    // backgroundColor: '#EEE'
  },
  item: {
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    padding: 0,
    marginBottom: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  itemBoxPan: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5,
  },
  itemBox: {
    height: Dimensions.get('window').height / numColumns, // approximate a square
    borderRadius: 5,
  },
  namePan: {
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: '#ECECFB',
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
    fontSize: 20,
  },
  barcode: {
    textAlign: 'center',
    fontSize: 15,
    color: '#999999',
    marginTop: 5,
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(ShelveItemsList);
