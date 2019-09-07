import React from 'react';
import { TextInput } from 'react-native';
import { Input } from 'react-native-elements'

export class RNTextInput extends React.Component{

	constructor(props) {
    super(props);
	}
	
  shouldComponentUpdate(nextProps, nextState) {
		
		if (this.props.focus !== nextProps.focus) {
			this._RNtextInput.focus()
      return true;
    }
   
    return false;
  }

	render(){
		return(
			<TextInput
				autoFocus={this.props.focus}
				placeholder={this.props.focus?"true":"false"} 
				style={{borderColor: 'black', borderWidth: 1}} 
				ref={component => this._RNtextInput = component}>
			</TextInput>
		)
	}
}

export class RNInput extends React.Component{

	constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    
		if (this.props.focus !== nextProps.focus) {
			console.log(this.props)
			this._RNInput.focus()
      return true;
    }
   
    return false;
  }

	render(){
		return(
			<Input
				focus={this.props.focus}
				type={this.props.type}
				// style={this.props.styles.input} 
				keyboardType={this.props.keyboardType}
				onChangeText={this.props.onChange}
				inputStyle={this.props.inputStyle}
				containerStyle={this.props.containerStyle}
				inputContainerStyle={this.props.inputContainerStyle}
				placeholder={this.props.label}
				autoFocus={this.props.focus}
				text={this.props.text}
				textAlign={this.props.textAlign}
				// placeholder={label}
				ref={component => this._RNInput = component}>
			</Input>
		)
	}
}