import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios';
import { push } from 'connected-react-router';
import {GET_STATIC,SHOW_STATIC
} from './constant';
import { toast } from 'react-toastify';

const CancelToken = axios.CancelToken;
let cancel;
async function getStaticApi() {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'GET',
            url: `${host.apiUrl}${api.apidGetStatic}`,
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
function* getStaticFlow(action) {
    let {value,index} =action;
    try {
        
        const response = yield call(getStaticApi,);
        if (response.status ===200)
        {
            let result = response.data.data.result
            yield put({type:SHOW_STATIC,result})
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



function* getDashboardWatcher() {
    yield takeLatest(GET_STATIC, getStaticFlow);
  
}

export default getDashboardWatcher();