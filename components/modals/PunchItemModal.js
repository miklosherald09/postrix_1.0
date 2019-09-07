import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Button, ListItem } from 'react-native-elements'
import { CloseButton } from '../Common'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { currency as curr } from '../../constants/constants'
import { punchedItemCount, punchItemInvisible, deletePunchItem } from '../../actions/punchedActions'
import NumberFormat from 'react-number-format'
import myStyles from '../../constants/styles'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PunchItemModal = (props) => {
 
	const { selectedItem, punchItemVisible } = props.punched

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
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.punchItemInvisible() }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>CHANGE PUNCH ITEM</Text>
								</View>
								<View style={myStyles.headerRight}>
									<Button
										onPress={ () => props.punchItemInvisible() }
										containerStyle={{marginHorizontal: 10}}
										title="OK"
										type='clear'
									/>
									{/* <SaveButton onPress={() => props.punchItemInvisible()}/> */}
								</View>

								{/* <View style={{ flex: 2 }}>
									<Text style={{fontSize: 18, margin: 10, color: '#CCC'}}>Change Punch Item</Text>
								</View>
								<View style={{ flex: 1 }}>
									<CloseButton onPress={ () => props.punchItemInvisible() }/>
								</View> */}
							</View>
							<View style={styles.content}>
								<View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
									<View style={{flex: 2, marginHorizontal: 10}}>
										<Text style={{fontSize: 15, color: '#666'}}>{selectedItem.name}</Text>
										<NumberFormat 
											renderText={value => <Text style={{fontSize: 18, fontWeight: 'bold', color: '#333'}}>{value}</Text>}
											fixedDecimalScale={true} decimalScale={2}
											value={selectedItem.sellPrice * selectedItem.count} 
											displayType={'text'} 
											thousandSeparator={true}
											prefix={curr} 
										/>
									</View>
									<View style={{flex: 1}}>
										<View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between'}}>
											<Button
												type="solid"
												onPress={() => props.punchedItemCount(1)}
												buttonStyle={{ width: 40, height: 40}}
												icon={<Icon
													name="plus"
													size={20}
													color="white"
												/>}>
											</Button>
											<Text style={{flex: 1, color: '#333', fontSize: 18, textAlign: 'center', marginTop: 3}}>{selectedItem.count}</Text>
											<Button
												type="solid"
												onPress={() => props.punchedItemCount(-1)}
												buttonStyle={{  width: 40, height: 40}}
												icon={<Icon
													name="minus"
													size={20}
													color="white"
												/>}>
											</Button>
										</View>
									</View>
								</View>
								
								<View style={{ marginRight: 10, marginLeft: 10, justifyContent: 'flex-start', flexDirection:'row', flexWrap:'wrap'}}></View>
							</View>
							<View style={{ flexDirection: 'row', height: 60, borderTopColor: '#EEE', borderTopWidth: 1, }}>
								<Button
                  onPress={ () => props.deletePunchItem() }
									containerStyle={{margin: 10}}
									titleStyle={{color: '#C0504D', fontSize: 15}}
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

	content: {
		flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(PunchItemModal)
