import  * as types from './constant' 
export const actEditStatus = (value,index) =>{
    return {
        type : types.EDIT_STATUS_PRODUCT,
        value : value,
        index : index,
    }
}
export const actPostStatus = (value,index) =>{
    return {
        type : types.POST_STATUS_PRODUCT,
        value : value,
        index : index,
    }
}
export const actGetProduct = () =>{
    return{
        type : types.GET_ALL_PRODUCT,
    }
}
export const actShowCate = (data) =>{
    return{
        type : types.SHOW_GATE,
        data  : data
    }
}
export const actGetCategoried = () =>{
    return{
        type : types.GET_ALL_CATEGORIES,
    }
}
export const actshowProduct = (products) =>{
    return{
        products :products,
        type : types.SHOW_ALL_PRODUCT,
    }
}
export const actAddProductSucess = (data) =>{
    return{
        data : data,
        type : types.ADD_PRODUCT_SUSSESS,
    }
}
export const actDeleteProduct = (id) =>{
    return{
        id : id,
        type : types.DELETE_PRODUCT,
    }
}

