import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { CloseButton } from '../Common'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { currency as curr } from '../../constants/constants'
import { punchedItemCount, punchItemInvisible, deletePunchItem } from '../../actions/punchedActions'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const PunchItemModal = (props) => {
 
	const { counter, selectedItem, punchItemVisible } = props.punched

	return (
		<View style={styles.wrapper}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={punchItemVisible}
				onRequestClose={() => {
          console.log('Modal has been closed.')
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.punchItemInvisible()}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} >
						<View style={styles.wrap}>
							<View style={styles.modalTopMenu}>
								<View style={{ flex: 2 }}>
									<Text style={{fontSize: 18, margin: 10, color: '#CCC'}}>Change Punch Item</Text>
								</View>
								<View style={{ flex: 1 }}>
									<CloseButton onPress={ () => props.punchItemInvisible() }/>
								</View>
							</View>
							<View style={{...styles.content, }}>
								<View style={{ flex: 2 }}>
									<Text style={{fontSize: 18, margin: 10}}>{selectedItem.name}</Text>
									<Text style={{fontSize: 18, margin: 10}}>{selectedItem.sellPrice} x {selectedItem.count}</Text>
								</View>
								<View style={{  flex: 1 }}>
									<Text style={{textAlign: 'right', color: '#333', fontSize: 25, margin: 10}}>{curr} {selectedItem.sellPrice * selectedItem.count}</Text>
									<View style={{ marginRight: 10, marginLeft: 10, justifyContent: 'flex-end', flexDirection:'row', flexWrap:'wrap'}}>
										<Button
											type="solid"
											onPress={() => props.punchedItemCount(1)}
											buttonStyle={{alignSelf: 'flex-end', marginRight: 5, width: 40, height: 40}}
											icon={<Icon
												name="plus"
												size={20}
												color="white"
											/>}>
										</Button>
										<Button
											type="solid"
											onPress={() => props.punchedItemCount(-1)}
											buttonStyle={{alignSelf: 'flex-end', width: 40, height: 40}}
											icon={<Icon
												name="minus"
												size={20}
												color="white"
											/>}>
										</Button>
									</View>
								</View>
							</View>
							<View style={{ flexDirection: 'row', height: 60, borderTopColor: '#EEE', borderTopWidth: 1, }}>
								<Button
                  onPress={ () => props.punchItemInvisible() }
									containerStyle={{flex: 1, margin: 10}}
									title="OK"
									type='clear'
								/>
								<Button
                  onPress={ () => props.deletePunchItem() }
									containerStyle={{flex: 1, margin: 10}}
									titleStyle={{color: '#C0504D'}}
									title="DELETE"
									type='clear'
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
		punched: state.punched
	}
}

function mapDispatchToProps(dispatch) {
	return {
		punchedItemCount: (val) => { dispatch(punchedItemCount(val)) },
		punchItemInvisible: () => { dispatch(punchItemInvisible()) },
		deletePunchItem: () => { 
			dispatch(deletePunchItem()),
			dispatch(punchItemInvisible())
		}
	}
}

const styles = StyleSheet.create({

	modalTopMenu: {
		flexDirection: 'row',
		height: 50,
		alignItems: 'stretch',
		borderBottomWidth: 1,
		borderBottomColor: '#EEE'
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
    borderRadius: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(PunchItemModal)
