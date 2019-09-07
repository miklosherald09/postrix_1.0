export const PAY = 'PAY'
export const PAY_MODAL_VISIBLE = 'PAY_MODAL_VISIBLE'
export const PAY_MODAL_INVISIBLE = 'PAY_MODAL_INVISIBLE'
export const SET_PAYMENT = 'SET_PAYMENT'
export const TOGGLE_PRINT_BUTTON = 'TOGGLE_PRINT_BUTTON'
export const RESET_PAYMENT = 'RESET_PAYMENT'

export function pay() {
  return {
    type: PAY,
  }
}

export function payModalVisible() {
  return {
    type: PAY_MODAL_VISIBLE,
  }
}

export function payModalInvisible() {
  return {
    type: PAY_MODAL_INVISIBLE,
  }
}

export function setPayment(value) {
  return {
    type: SET_PAYMENT,
    payload: value
  }
}

export function togglePrintButton(){
  return {
    type: TOGGLE_PRINT_BUTTON,
  }
}

export function resetPayment(){
  return {
    type: RESET_PAYMENT
  }
}