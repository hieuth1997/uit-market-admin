import { takeLatest, call, put,select } from 'redux-saga/effects';
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from 'axios';
import { push } from 'connected-react-router';
import { GET_ALL_NOTIFI,SHOW_ALL_NOTIFI,DELETE_NOTIFI,CALL_DELETE_SUCCESS,ADD_NOTIFI,ADD_NOTIFI_SUCCESS,ADD_NOTIFI_ERORR
} from './constant';
import { log } from 'util';
import { toast } from 'react-toastify';
const CancelToken = axios.CancelToken;
let cancel;

async function deleteNotiApi(id) {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'DELETE',
            url: `${host.apiUrl}${api.apiDeleteNoti}${id}`,
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

async function getAllNotiApi() {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'GET',
            url: `${host.apiUrl}${api.apiGetNoti}`,
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

async function addNotifiApi(notifi) {
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let data = await notifi;
        let response = await axios({
            method: 'POST',
            url: `${host.apiUrl}${api.apiAddNotifi}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data : data,
        })
        return response;
    } catch (error) {
        if(error.response.data.error)
        {
            toast.error(error.response.data.error)
        }else{
            toast.error("network is error")

        }
     

        
    }
} 
function* deletelNotiFlow(action) {
    const {id} = action;
    try {
        const response = yield call(deleteNotiApi,id);
        console.log(response)
        
      

         if (response.status===200)
         {
            yield put({type:CALL_DELETE_SUCCESS,id})
         }
           

    } catch (error) {
        console.log("error")
    }
}

function* getAllNotiFlow(action) {
    try {
        
        const response = yield call(getAllNotiApi);
        
            let notifi = response.data.data.result;
            yield put({type:SHOW_ALL_NOTIFI,notifi,})
           

    } catch (error) {
        console.log("error")
    }
}

function* addNotiFlow(action) {
    const {data} = action
    try {
   const id = localStorage.getItem('idUser'); 
   console.log(id);
   let sendApi = {...data,userId:id,sender:"hieuNT"}
   console.log(sendApi)
     
   const response =  yield call(addNotifiApi,sendApi)
   if(response.status===200)
   {

       let notifi = response.data.data.result
       yield put({type:ADD_NOTIFI_SUCCESS,notifi})
   }

    } catch (error) {
        yield put({type:ADD_NOTIFI_ERORR})
       
    }
}



function* getNotifiWatcher() {   
    yield takeLatest(GET_ALL_NOTIFI,getAllNotiFlow);
    yield takeLatest(DELETE_NOTIFI,deletelNotiFlow);
    yield takeLatest(ADD_NOTIFI,addNotiFlow);
    
    
}

export default getNotifiWatcher();