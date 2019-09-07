export const PAY_CHANGE_MODAL_VISIBLE = 'PAY_CHANGE_MODAL_VISIBLE'
export const PAY_CHANGE_MODAL_INVISIBLE = 'PAY_CHANGE_MODAL_INVISIBLE'
export const COMPUTE_CHANGE = 'COMPUTE_CHANGE'
// import { getAmountDue } from '../reducers/pay'

export function computeChange(values) {
  return {
    type: COMPUTE_CHANGE,
    total: values.total,
    payment: values.payment
  }
}

export function payChangeModalVisible() {
  return {
    type: PAY_CHANGE_MODAL_VISIBLE,
  }
}

export function payChangeModalInvisible() {
  return {
    type: PAY_CHANGE_MODAL_INVISIBLE,
  }
}
