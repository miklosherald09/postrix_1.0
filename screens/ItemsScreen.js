import React, { useEffect }  from 'react'
import { StyleSheet, View, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native'
import { ListItem, Input, Badge } from 'react-native-elements'
import NumberFormat from 'react-number-format'
import { MenuButton } from '../components/MenuButton'
import SaveItemModal from '../components/modals/SaveItemModal'
// import ItemsList from '../components/ItemsList'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { currency } from '../constants/constants'
import { saveItemModalVisible, setItemInput, selectItem, getItems, searchItems, addItemPrompt, refreshItemsList, getItemCount } from '../actions/itemActions'

timer = null
const onChangeText = (text) => {
  clearTimeout(timer)
  console.log('trying to search: '+text)
  timer = setTimeout(function () {
    console.log('searching... : ' + text)
    props.searchItems(text)
  }, 500)
}

const ItemsScreen = (props) => {

  const { items, refreshing, itemCount } = props.items
  const { userType } = props.pin

  const openMenu = () => {
    props.navigation.openDrawer()
  }
  
  const renderItem = ({ item, index }) => {
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

  useEffect(() => {
    props.getItems(),
    props.getItemCount()
  }, [])

	return (
		<View style={styles.wrapper}>
			<View style={styles.topMenu}>
				<View style={styles.topMenuLeft}>
					<MenuButton openMenu={openMenu.bind(this)} color="#333333"/>
				</View>
				<View style={styles.topMenuRight}>
					<SearchInput onChangeText={(text) => onChangeText(text)}/>
				</View>
			</View>
			<View style={styles.wrap}>
        <View style={styles.leftContent}>
          <View style={styles.bottomLinks}>
          <ListItem
            title={"Item Count"}
            rightAvatar={
              <Badge 
                value={itemCount} 
                status="primary" 
                textStyle={{fontSize: 18}} 
                badgeStyle={{paddingVertical: 15, paddingHorizontal: 5}} 
              />
            }
            bottomDivider
          />
          </View>
        </View>
        <View style={styles.rightContent}>
					<View style={styles.buttonPan}>
            <View style={styles.buttonPanRight}>
            </View>
          </View>
          <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, margin: 10}}>
              <FlatList
                keyExtractor={(x, i) => "item-list-"+String(i)}
                data={items}
                style={{flex: 1}}
                renderItem={renderItem}
                onEndReached={() => props.getItems()}
                initialNumToRender={2}
                onEndReachedThreshold={.05}
                onRefresh={() => props.handleRefresh()}
                refreshing={refreshing}
              />
            </SafeAreaView>
          </View>
        </View>
        <AddItemBUtton openModal={() => props.addItemPrompt()} />
      </View>
			<View>
				<SaveItemModal />
			</View>
		</View>
	);
}


function mapStateToProps(state) {
	return {
    formInputs: state.formInputs,
    items: state.items,
    pin: state.pin,
	}
}

function mapDispatchToProps(dispatch) {
    return {
      saveItemModalVisible: (val) => { dispatch(saveItemModalVisible(val)) },
      searchItems: (text) => dispatch(searchItems(text)),
      addItemPrompt: () => dispatch(addItemPrompt()),
      selectItem: (item) => {
        dispatch(saveItemModalVisible()),
        dispatch(selectItem(item))
      },
      openModal: (item) => {
        dispatch(setItemInput(item)),
        dispatch(updateItemModalVisible()) 
      },
      getItems: () => {
        dispatch(getItems())
      },
      handleRefresh: () => {
        dispatch(refreshItemsList())
        dispatch(getItems())
      },
      getItemCount: () => dispatch(getItemCount())
    }
}

class SearchInput extends React.Component{

  render(){
    return(
      <View style={styles.container}>
        <Input
          inputStyle={styles.input}
          inputContainerStyle={{borderBottomColor: 'white', marginTop: 5}}
          placeholder='search'
          onChangeText={ this.props.onChangeText }
          keyboardType='default'
          clearTextOnFocus={true}
          // value={this.props.searchText}
          leftIcon={
            <Icon
              name='search'
              size={24}
              color='#CCCCCC'
            />
          }
        />
      </View>
    )
  }
}

class AddItemBUtton extends React.Component{
  render(){
    return(
      <View style={{position: 'absolute', bottom: 15, right: 15}}>
        <TouchableOpacity onPress={() => this.props.openModal()}>
          <Icon
            name="plus-circle"
            size={60}
            color="#2B78FE"
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
		flexDirection: 'column',
  },
  topMenu: {
		height: 60,
		flexDirection: 'row',
    backgroundColor: 'white',
	},
  topMenuLeft: {
    flex: 4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CCC',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
	},
	topMenuRight: {
    flex: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
	},
	buttonPan: {
    margin: 10,
    flexDirection:'row',
  },
  buttonPanLeft: {
    flex: 1,
    flexWrap: 'wrap', 
    justifyContent : 'flex-start',
    flexDirection:'row',
  },
  buttonPanRight: {
    flex: 1,
    flexWrap: 'wrap', 
    justifyContent :'flex-end',
    flexDirection:'row',
	},
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContent: {
    flex: 4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CCC'

  },
  rightContent: {
    flex: 12,
    backgroundColor: '#EEE',
  },
  bottomLinks: {
    marginVertical: 20,
    marginHorizontal: 10
  },
  link: {
    fontSize: 25,
    color: '#333',
    marginTop: 10,
    fontWeight: 'bold'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);