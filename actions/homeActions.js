export const CONTENT_SHELVES = 'CONTENT_SHELVES'
export const CONTENT_CHARGE = 'CONTENT_CHARGE'
export const CHANGE_ACTIVE_CONTENT = 'CHANGE_ACTIVE_CONTENT'
export const TAX_DETAILS_VISIBLE = 'TAX_DETAILS_VISIBLE'
export const TAX_DETAILS_TOGGLE = 'TAX_DETAILS_TOGGLE'

export function changeActiveContent(val) {
  return {
    type: CHANGE_ACTIVE_CONTENT,
    activeContent: val  
  }
}

export function taxDetailsVisible(visible){
  return {
    type: TAX_DETAILS_VISIBLE,
    visible: visible
  }
}

export function taxDetailsToggle(){
  return {
    type: TAX_DETAILS_TOGGLE,
  }
}