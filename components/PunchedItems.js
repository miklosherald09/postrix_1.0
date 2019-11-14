import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

export class PunchedItems extends React.Component{

  count = '0';

  render(){
    return(
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text style={styles.itemName}>{this.props.name}</Text>
            <Text style={styles.itemPrice}>${this.props.price} x {this.props.count}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemPriceTotal}>$874.00</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(
    {
        container: {
            paddingTop: 5,
            paddingBottom: 5,
        },
        itemName: {
            color: 'black',
            fontSize: 20,
        },
        itemPrice: {
            color: '#666666',
            fontSize: 15,
        },
        itemPriceTotal: {
            textAlign: 'right',
            fontSize: 16,
            marginTop: 2
        }
    }
);