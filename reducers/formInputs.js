
const initialState = {
	additem: {
		name: '',
	},
}

export default function formInputsReducer (state = initialState, action) {
  switch (action.type) {
		case 'SET_ITEM_NAME':
			return { additem: {name: 'xxx'} }
		case 'UPDATE_ITEM':
			return { additem: [] }
	}
	return state
}