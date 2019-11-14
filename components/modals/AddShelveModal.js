import React from 'react'
import { StyleSheet, Text, View, TextInput, Modal, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import fstyle from '../../constants/styles'
import { addShelve, addModalInvisible } from '../../actions/shelvesActions'

const AddShelveModal = (props) => {
 
const { addMovalVisible } = props.shelves;

	return (
		<View style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={addMovalVisible}
        // visible={true}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View style={styles.modalTopMenu}>
            <View style={styles.modalTitle}>
              <Text style={{color: 'white', fontSize: 20}}>Create Shelves</Text>
            </View>
            <View style={styles.closeButtonPan}>
              <TouchableHighlight
                style={{alignSelf: 'flex-end'}}
                onPress={()=> { props.addModalInvisible() }}>
                <Icon
                  name="close"
                  size={30}
                  color="white"
                />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.container}>
              <TextInput
                style={{...fstyle.inputContainerStyle, ...fstyle.curve, borderBottomWidth: 2}}
                placeholder="name"
                onSubmitEditing={(e) => props.addShelve(e.nativeEvent.text)}
              />
            </View>
          </View>
        </View>
      </Modal>
		</View>
  );
}

function mapStateToProps(state) {
	return {
    shelves: state.shelves
	}
}

function mapDispatchToProps(dispatch) {
	return {
    addShelve: (text) => dispatch(addShelve(text)),
    addModalInvisible: () => dispatch(addModalInvisible()),
	}
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
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
  container: {
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
	containerStyle: {
		paddingHorizontal: 0,
	},
	container: {
		backgroundColor: 'white', 
		flex: 1,
		height: '100%'
	},
	modalTopMenu: {
		backgroundColor: '#202124',
		flexDirection: 'row',
		height: 60,
		alignItems: 'stretch'
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
	submitPan: {

	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShelveModal)
