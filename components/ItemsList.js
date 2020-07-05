import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, Text, SafeAreaView,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { saveItemModalVisible, setItemInput, selectItem, getItems, refreshItemsList } from '../actions/itemActions'
import { ListItem } from 'react-native-elements'
import { currency } from '../constants/constants'
import NumberFormat from 'react-number-format'

const ItemsList = (props) => {

  useEffect(() => {
    props.getItems()
  }, [])

  const { items, refreshing, searchText } = props.items

  renderItem = ({ item, index }) => {
    return (
      <ListItem
        onPress={ () => props.selectItem(item) }
        key={String(item.id)}
        title={String(item.name)}
        titleStyle={{ fontSize: 20, color: '#333' }}
        containerStyle={{padding: 10, marginBottom: 5, borderRadius: 4}}
        rightTitle={
          <NumberFormat
            renderText={value => <Text style={{fontSize: 20, color: '#333'}}>{value}</Text>} 
            fixedDecimalScale={true} 
            decimalScale={2}
            value={item.sellPrice}
            displayType={'text'} 
            thousandSeparator={true}
            prefix={currency} />}
        rightTitleStyle={{fontSize: 20}}
      />
    )
  }

  renderFooter = () => {
    return(
      refreshing?
      <View style={{marginTop: 10, alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>:null
    )
  }

  return(
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <FlatList
          keyExtractor={(x, i) => "item-list-"+String(i)}
          data={items}
          style={{flex: 1}}
          renderItem={this.renderItem}
          onEndReached={() => props.getItems()}
          initialNumToRender={2}
          onEndReachedThreshold={.05}
          onRefresh={() => props.handleRefresh()}
          refreshing={refreshing}
          onMomentumScrollBegin={() => alert('xx')}
        />
      </SafeAreaView>
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
    // setModalVisible: () => dispatch({ type: 'ADDITEM_MODAL_VISIBLE' }),
    selectItem: (item) => {
      dispatch(saveItemModalVisible()),
      dispatch(selectItem(item))
    },
    openModal: (item) => {
      dispatch(setItemInput(item)),
      dispatch(updateItemModalVisible()) 
    },
    getItems: () => {
      alert('onendreach')
      dispatch(getItems())
    },
    handleRefresh: () => {
      alert('handleRefresh')
      dispatch(refreshItemsList())
      dispatch(getItems())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);


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
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    margin: 0,
    padding: 0,
    marginBottom: 1,
    borderRadius: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});