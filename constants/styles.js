import { StyleSheet } from 'react-native';

export default StyleSheet.create({
		curve: {
			borderRadius: 10,
		},
		curveTopLeft: {
			borderTopLeftRadius: 10,
		},
		curveTopRight: {
			borderTopRightRadius: 10,
		},
		curveBottomLeft: {
			borderBottomLeftRadius: 10,
		},
		curveBottomRight: {
			borderBottomRightRadius: 10,
		},
		inputContainerStyle: {
			padding: 10, 
			margin: 0,
			width: '100%',
			borderLeftWidth: 2,
			borderRightWidth: 2,
			borderTopWidth: 2,
			borderBottomColor: null,
			borderBottomWidth: 0,
			borderColor: '#DDDDDD'
		},
		noRightBorder: {
			borderRightWidth: 0,
			borderRightColor: 'white',
		},
		inputStyle: {
			borderBottomColor: null, 
			borderBottomColor: 'white',
			borderBottomWidth: 0,
			margin:0,
			width: '100%',
		},
		bottomBorder: {
			borderBottomColor: '#DDDDDD',
			borderBottomWidth: 2,
		},
		header: {
			fontSize: 20, 
			fontWeight: 'bold',
			marginVertical: 10,
			marginHorizontal: 5,
			color: '#666',
			fontFamily: 'sans-serif-condensed'
		},

		// modal header styles

		header1: {
			fontSize: 22, 
			fontWeight: 'bold',
			color: '#666',
			fontFamily: 'sans-serif-condensed'
		},
		header2: {
			fontSize: 25, 
			fontWeight: 'bold',
			color: '#333',
			fontFamily: 'sans-serif-condensed'
		},
		header3: {
			fontSize: 30, 
			fontWeight: 'bold',
			color: '#333',
			fontFamily: 'sans-serif-condensed'
		},
		headerModal: {
			fontSize: 20,
			fontWeight: 'bold',
			color: '#333',
			fontFamily: 'sans-serif-condensed',
			margin: 9,
			paddingLeft: 5,
		},

		// modal header styles
		headerPan: {
			flexDirection: 'row',
			height: 50,
			alignItems: 'center',
			justifyContent: 'space-between',
			borderBottomWidth: 1,
			borderBottomColor: '#CCC',
			borderRadius: 10,
		},
		headerLeft: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'flex-start',
			justifyContent: 'flex-start',
		},
		headerMiddle: {
			flex: 2,
			alignItems: 'center'
		},
		headerRight: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'flex-end'
		},
	
		// input styles
		label1: {
			fontWeight: 'normal', 
			fontSize: 20, 
			color: '#999',
			fontFamily: 'sans-serif-condensed'
		},
		input1: {
			fontSize: 20, 
			color: '#333',
		}
});