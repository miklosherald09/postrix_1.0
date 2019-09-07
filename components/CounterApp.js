import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'


let styles;

const CounterApp = (props) => {

	const { container, 	} = styles
	
	const { counter, counterx } = props.counter;
	 
	return (
		<View style={styles.container}>
			<View>
				<Text style={{ fontSize: 20 }}>counterx: {counterx}</Text>
			</View>

			<View style={{ flexDirection: 'row', width: 200, justifyContent: 'space-around' }}>

			
				<TouchableOpacity onPress={() => props.increaseCounter()}>
						<Text style={{ fontSize: 20 }}>Increase</Text>
				</TouchableOpacity>
				<Text style={{ fontSize: 20 }}>{counter}</Text>
				
				<TouchableOpacity onPress={() => props.decreaseCounter()}>
						<Text style={{ fontSize: 20 }}>Decrease</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function mapStateToProps(state) {
    return {
		counter: state.counter,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
        decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp)

styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});