import  * as types from './constant' 
export const actGetAllCategories = () =>{
    return {
        type : types.GET_ALL_CATEGORIES,
    }
}
export const actDeleteCate = (id) =>{
    return {
        type : types.DELETE_CATE,
        id : id
    }
}
export const actAddCategories = (url,name)=>{
    return{
        type : types.ADD_CATEGORIES,
        url : url,
        name: name
    }
}




