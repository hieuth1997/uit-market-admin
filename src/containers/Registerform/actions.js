import * as types from './constant'
export const addUser = (resolve, reject, user) => {
    return {
        type: types.ADD_USER,
        resolve, reject, user
    }
}
export const updateUser = (resolve, reject, user ,id) => {
    return {
        type: types.UPDATE_USER,
        resolve, reject, user , id
    }
}
export const  getSchool = ()=> {
    return {
        type: types.GET_SCHOOL,
    }
}
