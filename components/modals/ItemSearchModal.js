import React from 'react'
import { StyleSheet, Modal, View } from 'react-native'
import { connect } from 'react-redux'
import ItemSearchList from '../ItemSearchList'
import { modalClose, searchItem, setSearchText } from '../../actions/itemSearchActions'
import { CloseButton } from '../buttons/GenericButtons'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemSearchModal = (props) => {

	const { searchText, itemSearchModalVisible } = props.itemSearch;
	
	timer = null
	const onChangeText = (text) => {
		
		clearTimeout(timer);

		timer = setTimeout(function () {
			props.searchItem(text)
		}, 500)
	}
	
	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
        hardwareAccelerated={true}
				visible={itemSearchModalVisible}
				onRequestClose={() => {
					console.log('Modal has been closed.');
				}}
        >
				<View style={styles.container}>
					<View style={styles.leftTopBar}>
						<View style={{flexDirection: 'row'}} >
							<View style={{flex: 2}}>
								<Input
									inputStyle={styles.input}
									inputContainerStyle={{borderBottomColor: 'white'}}
									placeholder='search'
									onChangeText={ (text) => onChangeText(text) }
									keyboardType='default'
									clearTextOnFocus={true}
									// focus={itemSearchModalVisible}
									defaultValue={searchText}
									leftIcon={
										<Icon
											name='search'
											size={24}
											color='#CCCCCC'
										/>
									} />
							</View>
							<View style={{marginTop: 2}}>
								<CloseButton onPress={ () => props.modalClose() } color="#333"/>
							</View>
						</View>
					</View>
					<View style={{flex: 1}}>
         		<ItemSearchList />
					</View>	
				</View>
			</Modal>
		</View>
	);
}


function mapStateToProps(state) {
	return {
    itemSearch: state.itemSearch,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		modalClose: () => dispatch(modalClose()),
		searchItem: (text) => {
			dispatch(setSearchText(text))
			dispatch(searchItem(text))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSearchModal)

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		backgroundColor: '#EEE',
		flex: 1
	},
	leftTopBar: {
    height: 60,
    backgroundColor: 'white',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
	closeButtonPan: {
		flex: 1,
		height: 60,
		alignSelf: 'flex-end',
		width: 50,
	},
	input: {
		// backgroundColor: 'blue',
		height: 58,
		paddingLeft: 10,
		borderBottomWidth: 0,
		borderBottomColor: 'white',
	}
});

