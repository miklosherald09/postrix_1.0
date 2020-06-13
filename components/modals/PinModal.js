import React from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import { connect } from 'react-redux'

const PinModal = (props) => {
 
  const { total, punched } = props.punched;

	return (
		<View style={styles.wrapper}>
      <Modal
				animationType="slide"
        transparent={true}
        hardwareAccelerated={true}
				visible={true}
				onRequestClose={() => {
					console.log('Modal has been closed.');
				}}>
        <View style={styles.container} >
          <Text>lsdfj</Text>
        </View>
      </Modal>
		</View>
  );
}

function mapStateToProps(state) {
	return {
    punched: state.punched,
	}
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PinModal)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'red'
  },
  container: {
    backgroundColor: 'white',
    width: 500,
    height: 200,
    borderRadius: 10,
  }
});