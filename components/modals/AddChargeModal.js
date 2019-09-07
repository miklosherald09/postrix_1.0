import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { addShelveItemsInvisible, selectShelveItem, saveShelveItems, initShelves } from '../../actions/shelvesActions'
import { CloseButton } from '../Common'
import { Input, ListItem } from 'react-native-elements'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class RenderItem extends React.Component{
  render (){
    return (
      <ListItem
        onPress={ this.props.onPress }
        containerStyle={{borderBottomColor: '#EEE', borderBottomWidth: 1}}
        leftAvatar={{ source: require('../../assets/alfonso.fw.png') }}
        title={this.props.item.name}
        titleStyle={{ color: '#333', fontSize: 15 }}
      />
    )
  }
}

const DebuggerScreen = (props) => {
 
	const { addCharge } = props.charge
	const keyExtractor = (item, index) => index.toString()

	return (
		<View style={styles.wrapper}>
      <Modal 
        animationType="none"
        transparent={true}
        visible={true}
				onRequestClose={() => {
          console.log('Modal has been closed.')
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.addShelveItemsInvisible()}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap}>
							<View style={styles.modalTopMenu}>
								<View style={{ flex: 2 }}>
									<Text style={{fontSize: 18, margin: 10}}>Create Create Charge</Text>
								</View>
								<View style={{ flex: 1 }}>
									<CloseButton onPress={ () => props.addShelveItemsInvisible() }/>
								</View>
							</View>
							<View>
								<Input
									placeholder='search'
									leftIcon={{ type: 'font-awesome', name: 'search', color: '#CCC' }}
								/>
							</View>
							<View style={{...styles.content, }}>
								<ScrollView contentContainerStyle={{flexWrap: 'wrap'}}>
									<FlatList
										contentContainerStyle={styles.list}
										keyExtractor={keyExtractor}
										data={items}
										renderItem={({item}) => <RenderItem onPress={() => props.selectShelveItem(item)} item={item}/>}
									/>
								</ScrollView>
							</View>
							<View style={{ height: 60 }}>
								<Button
                  onPress={ () => props.saveShelveItems()}
									containerStyle={{margin: 10}}
									title="Done"
								/>
							</View>
						</View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		charge: state.charge
	}
}

function mapDispatchToProps(dispatch) {
	return {
    addShelveItemsInvisible: () => { dispatch(addShelveItemsInvisible()) },
		selectShelveItem: (item) => { dispatch(selectShelveItem(item)) },
		saveShelveItems: () => {	dispatch(saveShelveItems()) }
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
		flexDirection: 'row'
	},

  wrapper: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
	},
	wrap: {
		flex: 1,
		justifyContent: 'center'
	},
  touchable: {
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    height: screenHeight - (screenHeight * 0.1 * 2),
    marginLeft: screenWidth * 0.2,
    marginRight: screenWidth * 0.2,
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.01,
	},
	list: {
		justifyContent: 'center',
		flexDirection: 'column',
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DebuggerScreen)
// export default connect(mapStateToProps, mapDispatchToProps)(AddShelveItemsModal)
