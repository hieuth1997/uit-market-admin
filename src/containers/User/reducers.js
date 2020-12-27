import * as types from './constant';

let initial =
{
    user : [],
    searchUser : [],
    loading :false,
}


const getUser = (state = initial, action) => {
    const {user ,data,id} = action;
    switch (action.type) {
        case types.GET_ALL_USER :
            return {...state,loading:true}
        case types.EDIT_STATUS : 

        return {...state,loading :true};
     
        case types.SHOW_ALL_USER :
            let getUser = user.map((index)=>{
                return { key : index.id ,...index}
            })
            console.log(getUser)
            return {...state,user : getUser,loading:false};
        case types.ADD_USER_SUSSESS :
            let newUser = Object.assign(data,{key:data.id})
            let newUsers = [newUser,...state.user]
            
            return {...state,user:newUsers}
        case types.DELETE_USER_SUSSESS :
            let users = state.user.filter( user =>user.id !== id


            )
            return {...state,user:users,loading:false};
            case types.DELETE_USER :
                return {...state,loading :true}
            case types.EDIT_USER_SUSSESS :
                let editUser = Object.assign(data,{key:data.id})
                let findId = state.user.findIndex(index => index.id ===id)
                 state.user.splice(findId,1,editUser)
                

            return {...state}
            case types.EDIT_STATUS_SUSSESS :
                    let findIndex = state.user.findIndex(index => index.id ===id);
                    let newArray = [...state.user]
                    newArray[findIndex].enabled = data.enabled;
                  
                    
                    
    
                return {...state,user:newArray,loading:false}
                case  types.WHEN_HAS_ERROR :
                    alert("network error")
                    return {...state,loading:false}
        default : return state;
            

  
    }

}
export default getUser;