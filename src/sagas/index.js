import { all } from "redux-saga/effects";
import onSiginSaga from "./../containers/LogIn/sagas";
import onAdminPageSaga from "./../containers/Adminpage/sagas";
import onUserPageSaga from './../containers/User/sagas';
import onFormPageSaga from './../containers/Registerform/sagas';
import onProductSaga from './../containers/Product/sagas';
import onCommentSaga from './../containers/Comment/sagas';
import onCateSaga from './../containers/Categori/sagas';
import onNotiSaga from './../containers/Notification/sagas';
import onDashboardSaga from './../containers/Dashboard/sagas';
function* rootSaga() {
  yield all([
    onSiginSaga,
    onAdminPageSaga,
    onUserPageSaga,
    onFormPageSaga,
    onProductSaga,
    onCommentSaga,
    onCateSaga,
    onNotiSaga,
    onDashboardSaga
  ]);
}

export default rootSaga;
