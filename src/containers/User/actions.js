import  * as types from './constant' 
import { log } from 'util'
export const actOpenform = () => {
    return {
        type : types.OPEN_FORM,

        
    }
}
export const actEditStatus = (value,index) =>{
    console.log(value,index);
    
    return {
        type : types.EDIT_STATUS,
        value : {enabled : value},
        index : index.id,
    }
}
export const actSearchName = (value) =>{
    return {
        type : types.SEARCH_NAME,
        userName : value,
    }
}
export const actGetUser = () =>{
    return{
        type : types.GET_ALL_USER,
    }
}
export const actError = () =>{
    return{
        type : types.WHEN_HAS_ERROR,
    }
}
export const actshowUser = (user) =>{
    return{
        user :user,
        type : types.SHOW_ALL_USER,
    }
}
export const actAddUserSucess = (data) =>{
    return{
        data : data,
        type : types.ADD_USER_SUSSESS,
    }
}
export const actDeleteUser = (id) =>{
    return{
        id : id,
        type : types.DELETE_USER,
    }
}
export const actDeleteSussess = (id) =>{
    return{
        id : id,
        type : types.DELETE_USER_SUSSESS,
    }
}
export const editUserSussess = (data,id) =>{
    return{
        data : data,
        id :id,
        type : types.EDIT_USER_SUSSESS,
    }
}
export const actEditStatusSuccess = (data,id) =>{
    return{
        data : data,
        id : id,
        type : types.EDIT_STATUS_SUSSESS,
    }
}
