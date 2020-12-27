import  * as types from './constant' 
export const actGetNotifi = () =>{
    return {
        type : types.GET_ALL_NOTIFI,
    }
}

export const actDeleteNotifi = (id) =>{
  
    return {
        type : types.DELETE_NOTIFI,
        id : id,
    }
}
export const actAddnotifi = (data) =>{
  
    return {
        type : types.ADD_NOTIFI,
        data
    }
}




