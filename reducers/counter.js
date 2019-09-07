
const initialState = {
	counterx: 732,
	counterz: 99,
	counter: 1
}

export default function counterReducer (state = initialState, action) {
  switch (action.type) {
		case 'INCREASE_COUNTER':
				return { counter: state.counter + 1, counterx: 20 }
		case 'DECREASE_COUNTER':
				return { counter: state.counter - 1,  counterx: 22  }
	}
	return state
}