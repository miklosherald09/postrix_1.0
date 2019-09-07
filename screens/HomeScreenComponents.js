import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'


export class AddShelveButton extends React.Component{
  render(){
    return (
      <Button
        onPress={this.props.onPress}
        buttonStyle={{margin: 10}}
        type="clear"
        icon={<Icon
          name= "plus"
          size= {16}
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
          titleStyle={{fontSize: 14}}
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
      <View style={this.props.activeShelve.name == this.props.shelve.name?styles.menuIconActive:styles.menuIcon}>
        <Button 
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
          title={this.props.shelve.name}
          type="clear"
          titleStyle={{fontSize: 14}}
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
        titleStyle={{color: 'black', fontWeight: 'normal', marginLeft: 10, color: '#666'}}
        icon={
          <Icon
            name="search"
            size={25}
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
          buttonStyle={{borderRadius: 0, flex: 1}}
          containerStyle={{borderRadius: 0, flex: 1}}
          onPress={this.props.onPress}
          titleStyle={{fontSize: 15}}
          title="CHARGE"
        />
      </View>
    )
  }
};


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
