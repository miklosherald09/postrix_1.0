import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { MenuButton } from '../components/MenuButton'
import SettingsNav from '../navigation/SettingsNav'
import { discountModalVisible, selectDiscount, addDiscountPrompt, getDiscounts } from '../actions/discountActions'
import { Card, Avatar, ListItem } from 'react-native-elements'
import { AddButton } from '../components/Common'
import DiscountModal from  '../components/modals/DiscountModal'
import { currency } from '../constants/constants'

const SettingsDiscountScreen = props => {

  useEffect(() => {
    // props.getTaxes()
  }, [])

	const openMenu = () => {
		props.navigation.openDrawer()
	}

  const { discounts } = props.discount

  return (
    <View style={styles.wrapper}>
      <View style={styles.topMenu}>
        <View style={styles.topMenuLeft}>
          <MenuButton openMenu={openMenu.bind(this)} color="#333"/>
        </View>
        <View style={styles.topMenuRight}>
        </View>
      </View>
      <View style={styles.wrap}>
        <View style={styles.leftContent}>
          <SettingsNav />
        </View>
        <View style={styles.rightContent}>
          <Card 
            style={{flex: 1}}
            title="Discounts"
            titleStyle={{fontSize: 20}} >
            <ScrollView>
            {
              discounts.map((u, i) => {
                preValue = u.type == 'BILL'?currency:''
                postValue = u.type == 'PERCENTAGE'?'%':''
                title = u.name + ' - ' + preValue + u.value + postValue

                return (
                  <Discount
                    key={'d'+i}
                    avatarTitle={u.name.slice(0, 1)}
                    title={title}
                    type={u.type}
                    onPress={() => props.selectDiscount(u)} 
                  />
                );
              })
            }
            </ScrollView>
          </Card>
          <View style={{position: 'absolute', bottom: 0, right: 0, margin: 20}}>
            <AddButton onPress={() => props.addDiscountPrompt()}/>
          </View>
        </View>
      </View>
      <DiscountModal />
    </View>
  );
}

function mapStateToProps(state) {
	return {
    discount: state.discount,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    getDiscounts: () => dispatch(getDiscounts()),
    selectDiscount: (val) => {
      dispatch(selectDiscount(val))
      dispatch(discountModalVisible(true))
    },
    discountModalVisible: () => dispatch(discountModalVisible(true)),
    addDiscountPrompt: () => dispatch(addDiscountPrompt())
  }
}

const Discount = ({onPress, title, avatarTitle, type}) => {
  return (
    <TouchableOpacity key={'tax-' + i} onPress={onPress}>
      <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
        <Avatar
          rounded
          title={avatarTitle}
          size="small"
        />
        <Text style={{fontSize: 20, marginLeft: 10, marginTop: 2}}>{title}{}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  user: {
    backgroundColor: 'red',
  },
  image:  {
  },
  name: {
  },
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
  },
  navLinks: {
		marginVertical: 20,
    marginHorizontal: 10
  },
  link: {
		fontSize: 20,
		color: '#333'
  },
  buttonPanLeft: {
    flex: 1,
    flexWrap: 'wrap', 
    justifyContent : 'flex-start',
    flexDirection:'row',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDiscountScreen);
