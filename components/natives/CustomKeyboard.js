import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export class CustomKeyboard extends React.Component {

  constructor(){
    super()
    this.state = {
      number: ''
    }
  }

  concatNum = (x) => {
    number = this.state.number + String(x)

    this.setState({
      number: number
    })
  }

  popNum = () => {
    number = this.state.number

    this.setState({
      number: number.slice(0, -1)
    })
  }

  clearNum = () => {
    this.setState({
      number: ''
    })
  }

  fire = (x) => {
    
    switch (true){
      case (x < 10): {
        // allow only 2 decimal places in
        stateNum = this.state.number
        if( stateNum.slice(stateNum.length - 3, -2) != '.' ){
          number = this.state.number + String(x)
          this.concatNum(x)
          this.props.onBind(number)
        }
        break
      }
      case (x == '.') : {

        number = this.state.number + String(x)
        i = this.state.number.indexOf(x)
        if(i < 0){
          this.concatNum(x)
          this.props.onBind(number)
        }
        break
      }
      case (x == 'del'): {
        this.popNum()
        number = this.state.number
        number.slice(0, -1)
        
        if(number.toString().length == 0)
          number = 0

        this.props.onBind(number)
          break
      }
      case (x == 'x'): {
        this.clearNum()
        this.props.onBind(0)
        break
      }
    }
    
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {
            [7, 8, 9].map((v, i) => {
              return (
                <View style={styles.box} key={i}>
                  <TouchableOpacity
                    onPress={() => this.fire(v)}
                    style={styles.to} >
                    <Text style={styles.num}>{v}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {
            [4, 5, 6].map((v, i) => {
              return (
                <View style={styles.box} key={i}>
                  <TouchableOpacity
                    onPress={() => this.fire(v)}
                    style={styles.to} >
                    <Text style={styles.num}>{v}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {
            [1, 2, 3].map((v, i) => {
              return (
                <View style={styles.box} key={i}>
                  <TouchableOpacity
                    onPress={() => this.fire(v)}
                    style={styles.to} >
                    <Text style={styles.num}>{v}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{...styles.box, flex: 2, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.fire('del')}
              style={styles.to}>
               <Icon
                name={'arrow-left'}
                size={22}
                color={'#333'}
              />
            </TouchableOpacity>
          </View>
          <View style={{...styles.box, flex: 2}}>
            <TouchableOpacity
              onPress={() => this.fire(0)}
              style={styles.to}>
              <Text style={styles.num}>0</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => this.fire('.')}
              style={styles.to}>
              <Text style={{...styles.num, fontSize: 35, marginTop: -20}}>.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => this.fire('x')}
              style={styles.to}>
              <Text style={{...styles.num, color: 'red'}}>C</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    
  },
  wrap: {
    backgroundColor: 'blue'
  },
	box: {
    flex: 1,
    backgroundColor: '#F7F7FD',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 50,
    borderColor: '#E8E8F9',
    borderWidth: 1,
  },
  num: {
    textAlign: 'center',
    fontSize: 25,
    color: '#333'
  },
  to: {
    flex: 1,
    justifyContent: 'center',
  },
  backspace: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
});