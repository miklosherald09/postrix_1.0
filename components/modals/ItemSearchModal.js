import React from 'react'
import { Text, StyleSheet, Modal, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ItemSearchList from '../ItemSearchList'
import SearchInput from '../SearchInput'
import { modalClose } from '../../actions/itemSearchActions'
import { CloseButton } from '../buttons/GenericButtons'


const ItemSearchModal = (props) => {
 
	const { itemSearchModalVisible } = props.itemSearch;
	
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
								<SearchInput />
							</View>
							<View style={styles.closeButtonPan}>
								<CloseButton onPress={ () => props.modalClose() } color="#333"/>
							</View>
						</View>
					</View>
					<View>
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
		padding: 14,
		height: 60,
		alignSelf: 'flex-end',
		width: 50,
	},
	
});

