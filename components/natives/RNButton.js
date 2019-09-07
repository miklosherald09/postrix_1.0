import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export class RNButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {count: 1};
    this.title = ""
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.props.title !== nextProps.title) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View>
        <Button
          title={this.props.title}
          onPress={() => this.setState(state => ({count: state.count + 1}))}>
        </Button>
        <Text>{this.state.count}</Text>
      </View>
    );
  }
}