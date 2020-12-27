import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios';
import { push } from 'connected-react-router';
import {
    SIGNIN_REQUESTING, SIGNIN_SUCCESS, SIGNIN_FAIL,SERVER_FAIL
} from './constants';

const CancelToken = axios.CancelToken;
let cancel;
async function signinApi(username, password) {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const dataSend = await {
            username: username,
            password: password
        };
        const response = axios.post(`${host.apiUrl}${api.apiSignin}`, JSON.stringify(dataSend), {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        
        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Canceled request');
        }
    }
}

function* signinFlow(action) {
    try {
        const {
            username,
            password,
        } = action;
        const response = yield call(signinApi, username, password);
        if (response.status === 200) {
            

            localStorage.setItem('jwtToken', response.data.data.result.token);
            localStorage.setItem('idUser',response.data.data.result.user.id )

            yield put({ type: SIGNIN_SUCCESS,});
            yield put(push('/'));
        }
    } catch (error) {

        if (error.response && error.response.data.error) {
            yield put({ type: SIGNIN_FAIL });
        
        } else {
            yield put({ type: SERVER_FAIL });
            
        }
    }
}

// function* pushLogin() {
//     localStorage.clear();
//     sessionStorage.clear();
//     yield put({type: SIGNIN_INITIAL_STATE});
//     yield put(push("/signin"));
// }

function* signinWatcher() {
    yield takeLatest(SIGNIN_REQUESTING, signinFlow);
    // yield takeLatest(PUSH_SIGNIN, pushLogin);
}

export default signinWatcher();