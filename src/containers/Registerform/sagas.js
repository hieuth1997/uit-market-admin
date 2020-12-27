import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios';
import { push } from 'connected-react-router';
import { actAddUserSucess ,editUserSussess,} from './../User/actions'
import {
    ADD_USER ,UPDATE_USER,GET_SCHOOL
    ,GET_SCHOOL_SUCCESS
} from './constant';
import { toast } from 'react-toastify';

const CancelToken = axios.CancelToken;
let cancel;
async function addUserApi(user) {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let data = await user;
        let response = await axios({
            method: 'POST',
            url: `${host.apiUrl}${api.apiAddUser}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: data,
        })
        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Canceled request');
        }
    }
}
async function getSchoolApi() {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'GET',
            url: `${host.apiUrl}${api.apiGetSchool}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
           
        })
        return response;
    } catch (error) {
        if(error.response.data.error)
        {
            toast.error(error.response.data.error)
        }
     
        console.log("err")
        toast.error("network is error")
    }
}

async function updateUserAPI(user,id) {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let data = user;
        console.log(data ,id)
        let response = await axios({
            method: 'PUT',
            url: `${host.apiUrl}${api.apiUpdateUser}${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: data,
        })
        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Canceled request');
        }
    }
}

function* addUserFlow(action) {
    const { resolve, reject, user } = action
    try {

        const response = yield call(addUserApi, user);
        console.log(response);
        if (response.status === 200) {
            const user = response.data.data.result;
            yield put(actAddUserSucess(user));
            yield resolve(true);
        }
    } catch (error) {
        yield reject(error);
        // if (error.response && error.response.data.error) {
        //     yield put({ type: SIGNIN_ERROR, error });
        // } else {
        //     console.log(error);
        //     yield put({ type: SIGNIN_ERROR_CATCH, error });
        // }
    }
}

function* updateUserFlow(action) {
    const { resolve, reject, user ,id } = action;
    try {

        const response = yield call(updateUserAPI, user ,id);
        if (response.status === 200) {
            const user = response.data.data.result;
            yield put (editUserSussess(user,id))
            
            yield resolve(true);
        }
    } catch (error) {
        yield reject(error);
        // if (error.response && error.response.data.error) {
        //     yield put({ type: SIGNIN_ERROR, error });
        // } else {
        //     console.log(error);
        //     yield put({ type: SIGNIN_ERROR_CATCH, error });
        // }
    }

    
    
    
}
function* getSchoolFlow(action) {
    
    try {

        const response = yield call(getSchoolApi);
        if (response.status === 200) {
            let schools = response.data.data.result;
            console.log(schools)
            yield put({type:GET_SCHOOL_SUCCESS,schools})
           
            
        
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


function* addUserWatcher() {
    yield takeLatest(ADD_USER, addUserFlow);
    yield takeLatest(UPDATE_USER, updateUserFlow);
    yield takeLatest(GET_SCHOOL, getSchoolFlow);
}

export default addUserWatcher();