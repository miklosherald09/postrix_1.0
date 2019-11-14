import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, TouchableHighlight } from 'react-native'
import { MenuButton } from '../components/MenuButton'
// import AddItemButton from '../components/buttons/AddItemButton'
import AddItemModal from '../components/modals/AddItemModal'
import UpdateItemModal from '../components/modals/UpdateItemModal'
import ItemsList from '../components/ItemsList'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { linkPermission } from '../functions'
import { Input } from 'react-native-elements'
import { itemInputDump, addItemModalVisible, syncGoogleSheet, seeAllItems, searchItems } from '../actions/itemActions'

const ItemScreen = (props) => {

  const { searchText  } = props.items
  const { userType } = props.pin

	openMenu = () => {
    props.navigation.openDrawer()
  }

  openModal = (item) => {
    props.setModalVisible();
  }

  timer = null
  onChangeText = (text) => {
    clearTimeout(timer);
    console.log('trying to search: '+text)
		timer = setTimeout(function () {
      console.log('searching... : '+text)
			props.searchItems(text)
		}, 500)
    
  }

  keyExtractor = (item, index) => index.toString();

  navLink = (nav, text) => {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
  }

	return (
		<View style={styles.wrapper}>
			<View style={styles.topMenu}>
				<View style={styles.topMenuLeft}>
					<MenuButton openMenu={this.openMenu.bind(this)} color="#333333"/>
				</View>
				<View style={styles.topMenuRight}>
					<SearchInput onChangeText={(text) => onChangeText(text)}/>
				</View>
			</View>
			<View style={styles.wrap}>
        <View style={styles.leftContent}>
          <View style={styles.bottomLinks}>
            {/* <Button
              title="xx"
              onPress={() => props.seeAllItems()}
            /> */}
            {navLink('Items', 'Items')}
            {/* {navLink('ItemsAdvance', linkPermission('ItemsAdvance', userType)?'Google Sheet':'')} */}
          </View>
        </View>
        <View style={styles.rightContent}>
					<View style={styles.buttonPan}>
            
            {/* <View style={styles.buttonPanLeft}>
             
              { SyncItemButton(props) }
              <Text style={{marginTop: 10, marginLeft: 5}}>{syncingGoogleSheet?'synching...':''}</Text>
            </View> */}
            <View style={styles.buttonPanRight}>
              {/* <Text>Items: {itemsCount}</Text> */}
            </View>
          </View>
          <ItemsList/>
        </View>
        <AddItemBUtton openModal={() => props.setModalVisible()} />
      </View>
			<View>
				<AddItemModal />
        <UpdateItemModal />
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
      setModalVisible: () => { dispatch(addItemModalVisible()) },
      setItemInput: (item) => dispatch({type: 'SET_ITEM_INPUT', payload: item}),
      itemInputDump: () => dispatch(itemInputDump()),
      syncGoogleSheet: () => dispatch(syncGoogleSheet()),
      seeAllItems: () => dispatch(seeAllItems()),
      searchItems: (text) => dispatch(searchItems(text))
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);