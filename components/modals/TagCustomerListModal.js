import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Alert, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'
import { CloseButton, CheckButton } from '../../components/Common'
import myStyles from '../../constants/styles'
import { saveInput, deleteTax } from '../../actions/taxActions'
import { tagCustomerListModalVisible, setSelectedTagCustomer, saveTagCustomer, getTagCustomers, refreshTagCustomers } from '../../actions/customerActions'


const TagCustomerModal = (props) => {

  useEffect(() => {
    props.getTagCustomers()
  }, [])
 
  const FlatListItemSeparator = () => <View style={styles.line} />;
  const { tagCustomerListModalVisible, tagCustomers, tagCustomerList } = props.customer

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => props.setSelectedTagCustomer(item)} >
      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <Avatar
            rounded
            title={"S"}
            titleStyle={{fontSize: 22}}
            size="small"
          />
          <Text style={{fontSize: 22, marginLeft: 10, marginTop: 2}}>{item.name}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontSize: 22, color: '#999'}}>{item.address}</Text>
          {/* <NumberFormat renderText={value => <Text style={{fontSize: 20, color: '#333'}}>{value}</Text>} fixedDecimalScale={true} decimalScale={2} value={item.count * item.sellPrice} displayType={'text'} thousandSeparator={true} prefix={currency} /> */}
        </View>
      </View>
    </TouchableOpacity>
  )
  
	return (
		<View style={styles.wrapper}>
			<Modal
				animationType="none"
				transparent={true}
				visible={tagCustomerListModalVisible}
				onRequestClose={() => { props.tagCustomerListModalVisible(false)	}}>
				<TouchableOpacity activeOpacity={0} style={styles.touchable} onPress={ () => {props.tagCustomerListModalVisible(false)}}>
					<TouchableOpacity activeOpacity={0} style={styles.container} >
						<View style={styles.wrap} >
							<View style={myStyles.headerPan}>
								<View style={myStyles.headerLeft}>
									<CloseButton onPress={ () => props.tagCustomerListModalVisible(false) }/>
								</View>
								<View style={myStyles.headerMiddle}>
									<Text style={myStyles.headerModal}>Customer</Text>
								</View>
								<View style={myStyles.headerRight}>
									<CheckButton onPress={() => props.saveTagCustomer()}/>
								</View>
							</View>
							<View style={styles.content}>
                <FlatList
                  style={{flex: 1}}
                  keyExtractor={(item, index) => index.toString()}
                  data={tagCustomers}
                  renderItem={renderItem}
                  onEndReached={() => props.getTagCustomers()}
                  onEndReachedThreshold={0.1}
                  onRefresh={() => props.refreshTagCustomers()}
                  refreshing={tagCustomerList.refreshing}
                  // extraData={selectedOptions}
                  ItemSeparatorComponent={FlatListItemSeparator}
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
    customer: state.customer
	}
}

function mapDispatchToProps(dispatch) {
	return {
    saveTagCustomer: () => {
      dispatch(saveTagCustomer())
      dispatch(tagCustomerListModalVisible(false))
    },
    tagCustomerListModalVisible: (val) => dispatch(tagCustomerListModalVisible(val)),
    saveInput: (name, value) => dispatch(saveInput(name, value)),
    deleteTax: (id) => {
      Alert.alert( 'Delete Tax', 'Are you sure?', 
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => dispatch(deleteTax(id)) }
        ],
        { cancelable: false },
      )
    },
    setSelectedTagCustomer: (v) => {
      dispatch(setSelectedTagCustomer(v))
      dispatch(tagCustomerListModalVisible(false))
    },
    getTagCustomers: () => dispatch(getTagCustomers()),
    refreshTagCustomers: () => dispatch(refreshTagCustomers())
	}
}

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    borderRadius: 10,
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
    // width: screenWidth/2,
    // height: screenHeight/2,
    borderRadius: 10,
    backgroundColor: 'white',
    height: screenHeight - (screenHeight * 0.20 * 2),
    marginLeft: screenWidth * 0.2,
    marginRight: screenWidth * 0.2,
    marginTop: screenHeight * 0.08,
    marginBottom: screenHeight * 0.2,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
  label: {
    fontWeight: 'normal', 
    fontSize: 20, 
    color: '#999'
  },
  button: {
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
	containerStyle: {
		paddingHorizontal: 0,
	},
	closeButtonPan: {
		flex: 1,
		padding: 14,
		height: 60,
		alignSelf: 'flex-end',
    width: 50,
	},
	modalTitle: {
		flex: 1,
		height: 60,
		justifyContent: 'center',
		marginLeft: 10
	},
	content: {
		flex: 1,
		margin: 20,
  },
  invalid: {
    marginLeft: 10,
    color: 'red',
    fontSize: 20,
  },
  warning: {
    marginLeft: 10,
    color: 'red',
    fontSize: 20,
  },
  submitPan: {
    flex: 1,
    backgroundColor: 'blue'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TagCustomerModal)