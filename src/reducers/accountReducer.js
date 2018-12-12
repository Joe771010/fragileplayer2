const initialState = () => ({
  loginAccount: undefined,
  displayLoginDialog: false,
  userNameInput: '',
})

const accountReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'LOGIN_OPEN':
      return Object.assign({}, state, {
        displayLoginDialog: true
      })
    case 'LOGIN_CLOSE'  :
      return Object.assign({}, state, {
        displayLoginDialog: false,
        userNameInput: ''
      })
    case 'LOGIN_INPUT_CHANGE':
      return Object.assign({}, state, {
        userNameInput: action.userNameInput
      })
    case 'RESET_ACCOUNT':
      console.log('change account to ' + action.userNameInput);
      return Object.assign({}, state, {
        loginAccount: action.userNameInput
      })
    default:
      return state;
  }
}

export default accountReducer
