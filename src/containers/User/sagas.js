import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios';
import {actshowUser ,actDeleteSussess,actEditStatusSuccess,actError} from './actions'
import { push } from 'connected-react-router';
import {GET_ALL_USER,SHOW_ALL_USER
    ,DELETE_USER,EDIT_STATUS
} from './constant';
import { toast } from 'react-toastify';

const CancelToken = axios.CancelToken;
let cancel;
async function getUserApi() {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'GET',
            url: `${host.apiUrl}${api.apiGetuser}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response;
    } catch (error) {
        if(error.response.data.error)
        {
            toast.error(error.response.data.error)
        }
     

        toast.error("network is error")
    }
}
async function deleteUserApi(id) {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'DELETE',
            url: `${host.apiUrl}${api.apiDeleteUser}${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response;
    } catch (error) {
        toast.error(error.response.data.error)
    }
}
async function editUserApi(value,id) {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        
        
        let response = await axios({
            method: 'PUT',
            url: `${host.apiUrl}${api.apiUpdateEnableUser}${id}/update?enabled=${value.enabled}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },

        })
        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Canceled request');
        }
    }
}


function* getUserFlow(action) {
    try {
        
        const response = yield call(getUserApi);
        if (response.status ===200)
        {
            const user =  response.data.data.result;
           
            
            yield put(actshowUser(user))

        }
    } catch (error) {
        toast.error(error.response.data.error)
    }
}
function* deleteUserFlow(action) {
    let {id} =action;
    try {
        
        const response = yield call(deleteUserApi,id);
        if (response.status ===200)
        {
           yield put(actDeleteSussess(id))
        }
    } catch (error) {
        toast.error(error.response.data.error)

    }
}
function* editUserFlow(action) {
    let {value,index} =action;
    try {
        
        const response = yield call(editUserApi,value,index);
        if (response.status ===200)
        {
            yield put(actEditStatusSuccess(value,index))
        }
    } catch (error) {
        // if (error.response && error.response.data.error) {
        //     yield put({ type: SIGNIN_ERROR, error });
        // } else {
        //     console.log(error);
        //     yield put({ type: SIGNIN_ERROR_CATCH, error });
        // }
    }
}

// function* pushLogin() {
//     localStorage.clear();
//     sessionStorage.clear();
//     yield put({type: SIGNIN_INITIAL_STATE});
//     yield put(push("/signin"));
// }

function* getuserWatcher() {
    yield takeLatest(GET_ALL_USER, getUserFlow);
    yield takeLatest(DELETE_USER, deleteUserFlow);
    yield takeLatest(EDIT_STATUS, editUserFlow);
}

export default getuserWatcher();