import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, ScrollView, ActivityIndicator, VirtualizedList } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Icon } from 'react-native-elements'
import { setSelected, addShelveItemsInvisible, selectShelveItem, saveShelveItems, searchOptions, getOptions, refreshOptions, shitOptions } from '../../actions/shelvesActions'
import { CloseButton } from '../../components/Common'
import { Input, Button, Avatar } from 'react-native-elements'
import myStyles from '../../constants/styles'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const AddShelveItemsModal = (props) => {

	// const [ selected, setSelected ] = React.useState(new Map());
	const { addShelveItemsVisible, itemOptions, requestOption, selectedOptions } = props.shelves
	const keyExtractor = (item, index) => index.toString();

	// renderFooter = () => {
  //   return(
  //     <View style={{flex: 1, marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
  //       {requestOption.refreshing? <ActivityIndicator size='large' />:null}
  //     </View>
  //   )
	// }

	const RenderItem1 = ({item, selected, onSelect }) => {

		return (
			<TouchableOpacity
				style={[
					{ height: 50 },
					{ backgroundColor: selected ? 'skyblue' : 'white' },
				]}
				title={item.name}
				titleStyle={{ color: '#333', fontSize: 15 }}	
				onPress={() => onSelect(item)} >
				<Text>{item.name} - selected: {selected}</Text>			
			</TouchableOpacity>
		)
	}

	const RenderItem2 = ({item, selected, onSelect }) => {

		return (
			<ListItem
				key={'key-'+item.id}
				leftAvatar={
				selected?
					<Icon
						name="check-circle"
						size={35}
						color="#2089dc"
					/>:
					<Avatar
						rounded
						title={item.name.slice(0, 2)}
					/>
				}
				title={item.name}
				onPress={() => onSelect(item)}
				containerStyle={styles.shelveItem}
			/>
		)
	}

	const RenderItem3 = ({item, selected, onSelect}) => {

		return (
			<TouchableOpacity onPress={() => onSelect(item)} style={{}} >
				<View style={{height: 50, marginLeft: 10, flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
					{selected?
						<Icon
							style={{alignSelf: 'flex-start'}}
							name="check-circle"
							size={35}
							color="#2089dc"
						/>:
						<Avatar
							rounded
							title={item.name.slice(0, 2)}
						/> }
					<Text style={{fontSize: 20, color: '#333', marginLeft: 10}}>{item.name.slice(0, 50)}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	const onSelect2 = React.useCallback(
    item => {
      const newSelected = new Map(selectedOptions)
      newSelected.set(item.id, !selectedOptions.get(item.id))
      console.log(newSelected)
			props.setSelected(newSelected)
			props.selectShelveItem(item)
    },
    [selectedOptions],
	);
	
	const FlatListItemSeparator = () => <View style={styles.line} />;

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
										onRefresh={() => props.refreshOptions()}
										refreshing={requestOption.refreshing}
										renderItem={({item}) => <RenderItem3 selected={!!selectedOptions.get(item.id)} onSelect={onSelect2} item={item} />}
										extraData={selectedOptions}
										ItemSeparatorComponent={FlatListItemSeparator}
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
		getOptions: () => { dispatch(getOptions()) },
		refreshOptions: () => { dispatch(refreshOptions()), dispatch(getOptions()) },
		shitOptions: () => { dispatch(shitOptions()) },
		setSelected: (item) => { dispatch(setSelected(item)) }
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
	},
	line: {
    height: 0.5,
    width: "100%",
    backgroundColor:"rgba(255,255,255,0.5)"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShelveItemsModal)
