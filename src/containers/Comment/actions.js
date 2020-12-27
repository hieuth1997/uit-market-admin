import  * as types from './constant' 
export const actGetAllComment = () =>{
    return {
        type : types.GET_ALL_COMMENT,
    }
}
export const actEditStatus = (data,id) =>{
    return {
        type : types.EDIT_STATUS_COMMENT,
        data :data,
        id : id
    }
}



