import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import { Button, Divider, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NumberFormat from 'react-number-format'


export class AddShelveButton extends React.Component{
  render(){
    return (
      <Button
        onPress={this.props.onPress}
        buttonStyle={{margin: 6}}
        type="clear"
        icon={<Icon
          name= "plus"
          size= {27}
          color = '#4388D6'
        />}
      />
    )
  }
}

export class ShelveAllButton extends React.Component{
  render(){
    return (
      <View style={styles.menuIcon}>
        <Button 
          onPress={this.props.onPress}
          title="All"
          color="#333"
          type="clear"
          titleStyle={{fontSize: 20}}
        />
      </View>
    )
  }
}

export class ChargeButton extends React.Component {
  render(){
    return(
      <View style={{}}>
        <Button
          type='clear'
          onPress={this.props.onPress}
          icon={<Icon
            name='plus-circle'
            size={35}
            color='#039BE5' />} 
        />
      </View>
    )
  }
}

export class ShelveButton extends React.Component{
  render(){
    return(
      <View style={this.props.activeShelve.id == this.props.shelve.id?styles.menuIconActive:styles.menuIcon}>
        <Button 
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
          title={this.props.shelve.name}
          type="clear"
          titleStyle={{fontSize: 20}}
        />
      </View>
    )
  }
}

export class ItemSearchButton extends React.Component {
  render(){
    return(
      <Button
        onPress={this.props.onPress}
        containerStyle={{height: 60, paddingTop: 5}}
        titleStyle={{color: 'black', fontWeight: 'normal', marginLeft: 10, color: '#666', fontSize: 20}}
        icon={
          <Icon
            name="search"
            size={28}
            color="#666"
          />
        }
        type="clear"
        iconLeft
        title="search"
      />
    )
  }
}

export class PayButton extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Button
          buttonStyle={{borderRadius: 10,  flex: 1}}
          containerStyle={{flex: 1, padding: 10}}
          onPress={this.props.onPress}
          titleStyle={{fontSize: 20}}
          title="CHARGE"
        />
      </View>
    )
  }
};

export const DiscountButton = ({onPress}) => {
  return (
    <Button
      type='clear'
      onPress={onPress}
      icon={<Icon
        name='percentage'
        size={35}
        color='#039BE5' />} 
    />
  )
}

export const TaxList = ({taxes}) => {
  return (
    <View style={styles.taxInfoPan}>
      <Divider style={{ backgroundColor: '#CCC' }} />
      <ListItem
        key={i}
        containerStyle={{paddingTop: 5, paddingBottom: 5}}
        title=""
        titleStyle={{fontSize: 20}}
        rightTitle={
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 25, marginRight: 20}}>Net</Text> 
          <Text style={{fontSize: 25}}>Amt</Text>
        </View>}
        rightTitleStyle={{fontSize: 20, fontWeight: 'bold', color: 'black'}}
      />
      { taxes.map((tax, i) => {
          return (
            <ListItem
              key={i}
              containerStyle={{paddingTop: 5, paddingBottom: 5}}
              title={tax.name}
              titleStyle={{fontSize: 20}}
              rightTitle={
                <View style={{flexDirection: 'row'}}>
                  <NumberFormat 
                    renderText={value => <Text style={{fontSize: 25, marginRight: 20}}>{value}</Text>} 
                    fixedDecimalScale={true} 
                    decimalScale={2} 
                    value={tax.net?tax.net:0} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={""} />

                  <NumberFormat 
                    renderText={value => <Text style={{fontSize: 25}}>{value}</Text>} 
                    fixedDecimalScale={true} 
                    decimalScale={2} 
                    value={tax.amount?tax.amount:0} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={""} />
                </View>
              }
              rightTitleStyle={{fontSize: 20, fontWeight: 'bold', color: 'black'}}
            />
          )
        }) }
    </View>
  )
}


const styles = StyleSheet.create({
  menuIcon: {
		flex: 1,
		textAlign: 'center',
		justifyContent: 'center'
  },
  menuIconActive: {
    flex: 1,
		textAlign: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#4388D6'
  },
  chargePan: {
    margin: 10,
    width: 42,
    height: 42,
  }
});
