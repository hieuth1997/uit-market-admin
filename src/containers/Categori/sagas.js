import { takeLatest, call, put } from "redux-saga/effects";
import * as api from "./../../constants/endpoint";
import * as host from "./../../constants/host";
import axios from "axios";
import { push } from "connected-react-router";
import { toast } from 'react-toastify';
import {
  GET_ALL_CATEGORIES,
  SHOW_ALL_CATEGORIES,
  ADD_CATEGORIES_SUCCESS,
  ADD_CATEGORIES,
  DELETE_CATE,
  DELETE_CATE_SUSSESS,
  DELETE_CATE_FAIL
} from "./constant";
import { log } from "util";
const CancelToken = axios.CancelToken;
let cancel;
// async function getUserApi() {
//     try {
//         if (cancel !== undefined) {
//             cancel();
//         }
//         const token = localStorage.getItem('jwtToken');
//         let response = await axios({
//             method: 'GET',
//             url: `${host.apiUrl}${api.apiGetuser}`,
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             }
//         })
//         return response;
//     } catch (error) {
//         if (axios.isCancel(error)) {
//             console.log('Canceled request');
//         }
//     }
// }
// async function getAllCommentApi() {
//     try {
//         if (cancel !== undefined) {
//             cancel();
//         }
//         const token = localStorage.getItem('jwtToken');
//         let response = await axios({
//             method: 'GET',
//             url: `${host.apiUrl}${api.apiGetComment}`,
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             }
//         })
//         return response;
//     } catch (error) {
//         if (axios.isCancel(error)) {
//             console.log('Canceled request');
//         }
//     }
// }
// async function editCommentApi(value,index)
// {
//     try{
//         console.log(value)
//         const token = localStorage.getItem('jwtToken');
//         let response = await axios({
//             method: 'PUT',
//             url: `${host.apiUrl}${api.apiEditComment}${index}/update?enabled=${value}`,
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             },
//         })
//         return response;

//     }
//     catch (error){
//         if (axios.isCancel(error)) {
//             console.log('Canceled request');
//         }

//     }
// }

async function getAllCateApi() {
  try {
    if (cancel !== undefined) {
      cancel();
    }
    const token = localStorage.getItem("jwtToken");
    let response = await axios({
      method: "GET",
      url: `${host.apiUrl}${api.apiGetCategories}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("categories");
    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Canceled request");
    }
  }
}
async function deleteCateApi(id) {
    console.log(id)
    try {
        if (cancel !== undefined) {
            cancel();
        }
        const token = localStorage.getItem('jwtToken');
        let response = await axios({
            method: 'DELETE',
            url: `${host.apiUrl}${api.apiDeleteCate}${id}`,
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
async function addCateApi(url, name) {
  try {
    if (cancel !== undefined) {
      cancel();
    }
    const data = { categoryName: name , pictureUrl:url };
    const token = localStorage.getItem("jwtToken");
    let response = await axios({
      method: "POST",
      url: `${host.apiUrl}${api.apiAddCate}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    });
    return response;
  } catch (error) {
  
  }
}

function* getAllCateFlow(action) {
  try {
    

    const response = yield call(getAllCateApi);

    let categories = response.data.data.result;
    console.log(categories);

    yield put({ type: SHOW_ALL_CATEGORIES, categories });
  } catch (error) {
    console.log("error");
  }
}

function* addCateFlow(action) {
  const { url, name } = action;
  try {
    const reponse = yield call(addCateApi, url, name);
    if (reponse.status===200)
    {
        let categorie = reponse.data.data.result;
        console.log(categorie)
        yield put({type:ADD_CATEGORIES_SUCCESS,categorie})

    }
  } catch (error) {
    console.log("error");
  }
}
function* deleteCateFlow(action) {
    const { id } = action;
    try {
      const reponse = yield call(deleteCateApi,id);
      if (reponse.status===200)
      {
        yield put({type:DELETE_CATE_SUSSESS,id})
      
        
        
      }
    } catch (error) {
      toast.error("categories is used")
      yield put({type:DELETE_CATE_FAIL})
      
    }
  }

function* getCategoriesWatcher() {
  yield takeLatest(GET_ALL_CATEGORIES, getAllCateFlow);
  yield takeLatest(ADD_CATEGORIES, addCateFlow);
  yield takeLatest(DELETE_CATE, deleteCateFlow);
}

export default getCategoriesWatcher();
