import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios';
import { push } from 'connected-react-router';
import {GET_ALL_COMMENT
    ,SHOW_ALL_COMMENT,EDIT_STATUS_COMMENT,EDIT_SUCESS_COMMENT
} from './constant';
import { func } from 'prop-types';
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
        if (axios.isCancel(error)) {
            console.log('Canceled request');
        }
    }
}
async function getAllCommentApi() {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'GET',
            url: `${host.apiUrl}${api.apiGetComment}`,
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
async function editCommentApi(value,index)
{
    try{
        console.log(value)
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'PUT',
            url: `${host.apiUrl}${api.apiEditComment}${index}/update?enabled=${value}`,
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
        console.log("getcategories")
        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Canceled request');
        }
    }
}
function* editCommentFlow(action) {
    const {data,id} = action;
    try {
        
        const response = yield call(editCommentApi,data,id);
        if (response.status ===200)
        {
            
        }
        yield put({type:EDIT_SUCESS_COMMENT})


           

    } catch (error) {
        console.log("error")
        // if (error.response && error.response.data.error) {
        //     yield put({ type: SIGNIN_ERROR, error });
        // } else {
        //     console.log(error);
        //     yield put({ type: SIGNIN_ERROR_CATCH, error });
        // }
    }
}
// function * getCommentApi()
// {
//     const response = yield call(getAllCommentApi);
//     const responseUser = yield call(getUserApi)

// }
function* getAllCommentFlow(action) {
    try {
        
        const response = yield call(getAllCommentApi);
            let comments = response.data.data.result;
            // let users = responseUser.data.data.result;
            // console.log(users)

            yield put({type:SHOW_ALL_COMMENT,comments})
           

    } catch (error) {
        console.log("error")
        // if (error.response && error.response.data.error) {
        //     yield put({ type: SIGNIN_ERROR, error });
        // } else {
        //     console.log(error);
        //     yield put({ type: SIGNIN_ERROR_CATCH, error });
        // }
    }
}





function* getCommentWatcher() {
    yield takeLatest(GET_ALL_COMMENT,getAllCommentFlow);
    yield takeLatest(EDIT_STATUS_COMMENT,editCommentFlow);

}

export default getCommentWatcher();