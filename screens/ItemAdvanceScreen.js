import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, AppState } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { MenuButton } from '../components/MenuButton'
// import { WebView } from 'react-native-webview'
import { csvJSON } from '../functions'



const ItemAdvanceScreen = (props) => {

  const { googleSheetUrl, googleSheetUrlCsv } = props.settings

	openMenu = () => {
    props.navigation.openDrawer()
  }

  openModal = (item) => {
    props.setModalVisible();
  }

  navLink = (nav, text) => {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
  }
  
  getDataUsingGet = () => {
    //GET request 
    // fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRiITUxqtODjBjL3eOalWykvuvJcviqW1wdfdpHvVyRvdhDt2L-_BdZ3KlO5dkdPQ/pub?gid=1076655377&single=true&output=csv", {
    fetch(googleSheetUrlCsv, {
    method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'text/csv'
        }
    })
    .then((response) => {
        //Success 
        // return response.blob();
        return response.text()
        // console.log(csvJSON(responseJson));
    })
    .then((text) => {
      console.log(text)
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        console.log(error);
    });
  }

  return (
		<View style={styles.wrapper}>
			<View style={styles.topMenu}>
				<View style={styles.topMenuLeft}>
					<MenuButton openMenu={this.openMenu.bind(this)} color="#333333"/>
				</View>
				<View style={styles.topMenuRight}>
					{/* <ItemSearch /> */}
				</View>
			</View>
			<View style={styles.wrap}>
        <View style={styles.leftContent}>
          <View style={styles.bottomLinks}>
            {navLink('Items', 'Items')}
            {navLink('ItemsAdvance', 'Google Sheet')}
          </View>
        </View>
        <View style={styles.rightContent}>
          <WebView source={{ uri:  googleSheetUrl}} />
        </View>
      </View>
			<View>
				{/* <AddItemModal />
        <UpdateItemModal /> */}
			</View>
		</View>
	);
}

function mapStateToProps(state) {
	return {
    settings: state.settings,
	}
}

function mapDispatchToProps(dispatch) {
    return {
      setModalVisible: () => { dispatch(addItemModalVisible()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemAdvanceScreen);


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
	buttonPan: {
		margin: 10,
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
  },
  bottomLinks: {
    marginVertical: 20,
    marginHorizontal: 10
  }
});
