export const CONTENT_SHELVES = 'CONTENT_SHELVES'
export const CONTENT_CHARGE = 'CONTENT_CHARGE'
export const CHANGE_ACTIVE_CONTENT = 'CHANGE_ACTIVE_CONTENT' 

export function changeActiveContent(val) {
  return {
    type: CHANGE_ACTIVE_CONTENT,
    activeContent: val  
  }
}
