export const loginOpenAction = () => ({
  type: 'LOGIN_OPEN'
})

export const loginInputChangeAction = (userNameInput) => ({
  type: 'LOGIN_INPUT_CHANGE',
  userNameInput: userNameInput
})

export const loginCloseAction = () => ({
  type: 'LOGIN_CLOSE',
})

export const resetAccountAction = (userNameInput) => ({
  type: 'RESET_ACCOUNT',
  userNameInput: userNameInput
})
