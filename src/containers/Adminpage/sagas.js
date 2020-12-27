import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios'; import * as signinActions from './../LogIn/actions';
import { push } from 'connected-react-router';
import * as Constant from './constant';
import { toast } from 'react-toastify';

async function signoutApi() {
    try {
        const token = localStorage.getItem('jwtToken');

        let response = await axios({
            method: 'POST',
            url: `${host.apiUrl}${api.apiLogout}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function checkTokenAPi()
{
   try{
    const token = localStorage.getItem('jwtToken');
    const id = localStorage.getItem('idUser');
    let response = await axios({
        method : 'GET',
        url: `${host.apiUrl}${api.apiGetUserId}${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    return response
   }catch(error)
   {
    
       
   }
}

function* logoutFlow() {
    try {
        const response = yield call(signoutApi);
        console.log(response);
        if (response.status === 200) {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('idUser')
            yield put(push('/signin'));
            yield put (signinActions.notSigninSuccess())
        }
    } catch (error) {
        console.log(error);
        toast.error("server error", {
            position: toast.POSITION.TOP_CENTER
          })
    }
}
function * checkTokenflow() {
    try {
        const token =
    localStorage.getItem("jwtToken")
    if(!token || token === "")
        {
            return
        }
     const response =   yield call(checkTokenAPi);
     if (response.status===401)
     {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('idUser')
        yield put(push('/signin'));

     }

        
    } catch (error) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('idUser')
        yield put(push('/signin'));
        
    }
}

function* signinWatcher() {
    yield takeLatest(Constant.LOGOUT, logoutFlow);
    yield takeLatest(Constant.CHECK_TOKEN,checkTokenflow)
}

export default signinWatcher();