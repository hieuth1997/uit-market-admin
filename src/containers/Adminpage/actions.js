import * as Constant from './constant'
export const handleOpenSlider = () => {
    return {
        type : Constant.SET_COLAPSE,
    }
}

export const logout = () => {
    return {
        type : Constant.LOGOUT,
    }
}
export const checkToken = () => {
    return {
        type : Constant.CHECK_TOKEN,
    }
}