import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { reducer as form } from 'redux-form'
import adminPageReducer from "./../containers/Adminpage/reducers";
import dashboardReducer from "./../containers/Dashboard/reducers";
import loginReducer from "./../containers/LogIn/reducers";
import userReducer from "./../containers/User/reducers";
import productReducer from "./../containers/Product/reducers";
import commentReducer from "./../containers/Comment/reducers";
import categoriReducer from "./../containers/Categori/reducers";
import notifiReducer from "./../containers/Notification/reducers";
import formReducer from "./../containers/Registerform/reducers";
export default history =>
  combineReducers({
    router: connectRouter(history),
    form,
    adminPageReducer,
    dashboardReducer,
    loginReducer,
    userReducer,
    productReducer,
    commentReducer,
    categoriReducer,
    notifiReducer,
    formReducer
  });
