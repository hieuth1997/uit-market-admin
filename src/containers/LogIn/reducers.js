import * as Constants from "./constants";
const initialState = {
  open: false,
  isSignInRequest: false,
  isSignInSuccess: false,
  errorsSignIn: false,
  dataUserSignIn: false,
  hidden: true,
  RememberCheckBox: false,
  formErrors: { email: "", password: "" },
  emailValid: false,
  passwordValid: false,
  server: true,
  id: 121
};
function signinReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SIGNIN_REQUESTING:
      return {
        ...state,
        isSignInRequest: true,
        isSignInSuccess: false,
        open: true,
        server: true
      };
    case Constants.SIGNIN_SUCCESS:
      return { ...state, isSignInSuccess: true,};
    case Constants.NOT_SIGNIN_SUCCESS:
      return { ...state, isSignInSuccess: false, open: false };
    case Constants.SIGNIN_FAIL:
      return { ...state, open: false, errorsSignIn: true };
    case Constants.SERVER_FAIL:
      return { ...state, server: false, open: false };
    default:
      return state;
  }
}
export default signinReducer;
