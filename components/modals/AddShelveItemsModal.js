import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Icon } from 'react-native-elements'
import { addShelveItemsInvisible, selectShelveItem, saveShelveItems, searchOptions, getOptions } from '../../actions/shelvesActions'
import { CloseButton } from '../../components/Common'
import { Input, Button, Avatar } from 'react-native-elements'
import myStyles from '../../constants/styles'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const AddShelveItemsModal = (props) => {
 
	const { addShelveItemsVisible, itemOptions, requestOption } = props.shelves;
	const keyExtractor = (item, index) => index.toString();

	renderFooter = () => {
    return(
      <View style={{flex: 1, marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
        {requestOption.refreshing? <ActivityIndicator size='large' />:null}
      </View>
    )
	}
	
	return (
		<View style={styles.wrapper}>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={addShelveItemsVisible}
				onRequestClose={() => {
          console.log('Modal has been closed.')
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.addShelveItemsInvisible()}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap}>
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.addShelveItemsInvisible() }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>ADD SHELVES ITEM</Text>
								</View>
								<View style={myStyles.headerRight}>
									<SaveButton onPress={() => props.saveItem(input)}/>
								</View>
							</View>
							<View>
								<Input
									onChangeText={(text) => props.searchOptions(text)}
									placeholder='search'
									leftIcon={{ type: 'font-awesome', name: 'search', color: '#CCC' }}
								/>
							</View>
							<View style={styles.content}>
								<ScrollView contentContainerStyle={{flex: 1, borderRadius: 10, margin: 10}}>
									<FlatList
										keyExtractor={keyExtractor}
										data={itemOptions}
										onEndReached={() => props.getOptions()}
										onEndReachedThreshold={0.1}
										renderItem={({item}) => <RenderItem onPress={() => props.selectShelveItem(item)} item={item}/>}
										ListFooterComponent={this.renderFooter}
									/>
								</ScrollView>
							</View>
						</View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
		</View>
	);
}

export class SaveButton extends React.Component{

  render(){
    return (
      <Button 
        onPress={this.props.onPress} style={styles.opacity}
        title="Save"
        containerStyle={{marginHorizontal: 5}}
      />
    )
  }
}

export const RenderItem = (props) => {

  return (
    <ListItem
			leftAvatar={
				props.item.selected?
				<Icon
					name="check-circle"
					size={35}
					color="#2089dc"
				/>:
				<Avatar
					rounded
					title={props.item.name.slice(0, 2)}
				/>
			}
      onPress={props.onPress}
      containerStyle={styles.shelveItem}
      title={props.item.name}
      titleStyle={{ color: '#333', fontSize: 15 }}
    />
  )
}

function mapStateToProps(state) {
	return {
		shelves: state.shelves,
	}
}

function mapDispatchToProps(dispatch) {
	return {
    addShelveItemsInvisible: () => { dispatch(addShelveItemsInvisible()) },
		selectShelveItem: (item) => { dispatch(selectShelveItem(item)) },
		saveShelveItems: () => {	dispatch(saveShelveItems()) },
		searchOptions: (text) => { dispatch(searchOptions(text) )},
		getOptions: () => { dispatch(getOptions()) }
	}
}

const styles = StyleSheet.create({

	modalTopMenu: {
		flexDirection: 'row',
		height: 50,
		alignItems: 'stretch',
		borderBottomWidth: 1,
		borderBottomColor: '#CCC'
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 10,
	},

  wrapper: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
	},
	wrap: {
		flex: 1,
		justifyContent: 'center',
	},
  touchable: {
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  container: {
    backgroundColor: 'white',
    height: screenHeight - (screenHeight * 0.1 * 2),
    marginLeft: screenWidth * 0.2,
    marginRight: screenWidth * 0.2,
    marginTop: screenHeight * 0.05,
		marginBottom: screenHeight * 0.01,
		borderRadius: 10,
	},
	shelveItem: {
		margin: 0,
		paddingVertical: 10,
		paddingHorizontal: 0,
		borderBottomWidth: 1,
		borderBottomColor: '#ECECFB'
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShelveItemsModal)
