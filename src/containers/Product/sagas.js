import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios';
import { push } from 'connected-react-router';
import {GET_ALL_PRODUCT
    ,POST_STATUS_PRODUCT,GET_ALL_CATEGORIES,DELETE_PRODUCT
} from './constant';
import {actshowProduct,actShowCate,actEditStatus} from './actions';
import { async } from 'q';
import { toast } from 'react-toastify';

const CancelToken = axios.CancelToken;
let cancel;
async function getAllProductApi() {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'GET',
            url: `${host.apiUrl}${api.apiGetProduct}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
           
        }
    }
}
async function editProductApi(value,index)
{
    try{
        console.log(value)
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'PUT',
            url: `${host.apiUrl}${api.apiUpdateProduct}${index}/update?enabled=${value}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        return response;

    }
    catch (error){
        if (axios.isCancel(error)) {
            console.log('Canceled request');
        }

    }
}
async function deleteProductApi(index)
{
    try{
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'DELETE',
            url: `${host.apiUrl}${api.apideleteProduct}${index}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        return response;

    }
    catch (error){
        toast.error(error.response.data.error)
     
            
        

    }
}   

async function getAllCategoriesApi() {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'GET',
            url: `${host.apiUrl}${api.apiGetCategories}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Canceled request');
        }
    }
}
function* getAllProductFlow(action) {
    try {
        
        const response = yield call(getAllProductApi);
        if (response.status ===200)
        {
         yield put(actshowProduct(response.data.data.result))

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
function* getAllCategoriFlow(action) {
    try {
        
        const response = yield call(getAllCategoriesApi);
        if (response.status ===200)
        {
            yield put(actShowCate(response.data.data.result))

        }
    } catch (error) {
        if (error.response && error.response.data.error) {
             console.log(error.response.data.error)
        } else {
            console.log(error);
            
        }
    }
}


function* editProductFlow(action) {
    const {value,index} = action;
    try {
        
        const response = yield call(editProductApi,value,index);
        if (response.status ===200)
        {
         
         yield put(actEditStatus(value,index))

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
function* deleteProductFlow(action) {
    const {id} = action;
    try {
        const response = yield call(deleteProductApi,id)
        
        
    } catch (error) {
        // if (error.response && error.response.data.error) {
        //     yield put({ type: SIGNIN_ERROR, error });
        // } else {
        //     console.log(error);
        //     yield put({ type: SIGNIN_ERROR_CATCH, error });
        // }
    }
}



function* getProductWatcher() {
    yield takeLatest(GET_ALL_PRODUCT,getAllProductFlow);
     yield takeLatest(GET_ALL_CATEGORIES,getAllCategoriFlow);
    yield takeLatest(POST_STATUS_PRODUCT,editProductFlow);
    yield takeLatest(DELETE_PRODUCT,deleteProductFlow);
}

export default getProductWatcher();