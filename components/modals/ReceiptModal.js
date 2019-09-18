import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Icon, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { receiptModalInvisible, printReceipt } from '../../actions/receiptActions'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ReceiptModal = (props) => {
 
  const { receiptModalVisible, selected } = props.receipt;
  
	return (
		<View style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={receiptModalVisible} 
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={ () => {props.receiptModalInvisible()}}>
          <TouchableOpacity activeOpacity={1} style={styles.container} >
            <View style={{borderBottomColor: '#EEE', borderBottomWidth: 1}}>
              { closeModalButton(props) }
            </View>
            <View style={{marginVertical: 10, flex: 1, alignItems: 'center'}}>
              <View style={{alignContent: 'center'}}>
                { printButton(props, selected) }
              </View>
              <ScrollView>
                <View  style={{borderWidth: 1, borderColor: '#CCC', padding: 10}}>
                  <Text style={styles.companyName}>Cty Store</Text>
                  <View style={{flex: 1, width: 300}}>
                    {
                      selected.punched.map((item, index) => {
                        return (
                          <ListItem
                            key={index}
                            containerStyle={{padding: 5}}
                            title={item.name}
                            titleStyle={{fontSize: 12}}
                            subtitle={'x' + item.count}
                            subtitleStyle={{fontSize: 12}}
                            rightTitle={String(item.accruePrice)}
                            rightTitleStyle={{fontSize: 12}}
                          />
                        )
                      })
                    }
                  </View>
                  <Text style={{fontSize: 12}}>Total</Text>
                  <Text style={{fontSize: 20}}>{selected.total}</Text>
                </View>
              </ScrollView>
            </View>
            </TouchableOpacity>
          </TouchableOpacity>
      </Modal>
		</View>
	);
}

function mapStateToProps(state) {
	return {
    receipt: state.receipt
	}
}

function mapDispatchToProps(dispatch) {
	return {
    receiptModalInvisible: () => dispatch(receiptModalInvisible()),
    printReceipt: (transaction) => dispatch(printReceipt(transaction))
	}
}

const printButton = (props, transaction) => {
  return (
    <Button
      onPress={ () => props.printReceipt(transaction) }
      title="Print"
      buttonStyle={{width: 200}}
      containerStyle={{width: 200, marginVertical: 10}}
      iconContainerStyle={{marginRight: 20}}
      icon={
        <Icon
          name="print"
          size={15}
          color="white"
        />
      }
    />
  );
}

const closeModalButton = (props) => {
  return (
    <TouchableHighlight
      style={{alignSelf: 'flex-end'}}
      onPress={()=> {	props.receiptModalInvisible() }}>
      <Icon
        containerStyle={{padding: 10}}
        name="close"
        size={30}
        color="#333"
      />
    </TouchableHighlight>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    height: screenHeight - (screenHeight * 0.10 * 2),
    marginLeft: screenWidth * 0.05,
    marginRight: screenWidth * 0.05,
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.05,
  },
  touchable: {
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
  companyName: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptModal);

