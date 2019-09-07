import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import TransactionSearch from '../components/TransactionSearch'
import TransactionList from '../components/TransactionList'
import ReceiptModal from '../components/modals/ReceiptModal'
import { getTransactions } from '../actions/transactionActions'

class TransactionScreen extends React.Component{

  componentDidMount(){
    this.props.dispatch(getTransactions());
  }

  openMenu = () => {
    this.props.navigation.openDrawer();
  }

  render (){
    return (
      <View style={styles.wrapper}>
        <View style={styles.topMenu}>
          <View style={styles.topMenuLeft}>
            <MenuButton openMenu={this.openMenu.bind(this)} color="#333333"/>
          </View>
          <View style={styles.topMenuRight}>
            <TransactionSearch />
          </View>
        </View>
        <View style={styles.wrap}>
          <View style={styles.leftContent}>
            <Text></Text>
          </View>
          <View style={styles.rightContent}>
            <TransactionList />
          </View>
        </View>
        <ReceiptModal />
      </View>
    );
  }
}

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(TransactionScreen);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
		flexDirection: 'column',
  },
  topMenu: {
		height: 60,
		flexDirection: 'row',
    backgroundColor: 'white',
	},
  topMenuLeft: {
    flex: 4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CCC',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
	},
	topMenuRight: {
    flex: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContent: {
    flex: 4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#CCC'

  },
  rightContent: {
    flex: 12,
    backgroundColor: '#EEE',
  }
});
