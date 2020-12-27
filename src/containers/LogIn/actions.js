import * as Constants from './constants';

export const requestSignin = ({ username, password }) => {
  return {
    type: Constants.SIGNIN_REQUESTING,
    username,
    password,
  }
}

export const signinSuccess = () => {
  
  return {
    type: Constants.SIGNIN_SUCCESS,
  }
}

export const notSigninSuccess = () => {
  return {
    type: Constants.NOT_SIGNIN_SUCCESS,
  }
}
export const signInFail = () => {
  return {
    type: Constants.SIGNIN_FAIL,
  }
}
export const serverFail = () => {
  return {
    type: Constants.SERVER_FAIL,
  }
}