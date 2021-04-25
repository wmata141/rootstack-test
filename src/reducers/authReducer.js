export const LOGIN_USER = 'LOGIN_USER'

const initialState = {
  token: undefined,
  user: undefined,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:      
      return action.payload
    default:
      break;
  }
  return state
}

export default authReducer