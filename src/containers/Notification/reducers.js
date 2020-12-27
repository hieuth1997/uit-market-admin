import * as types from "./constant";

let initial = {
  loading: false,
  notifis : [],
  
};

const getCategories = (state = initial, action) => {
  const { products, data, id, notifi } = action;
  switch (action.type) {
    case types.SHOW_ALL_NOTIFI :
      
      return {...state,notifis:notifi,loading:false}
      case types.GET_ALL_NOTIFI :
        return {...state,loading:true}
        case types.DELETE_NOTIFI : 
        return {...state,loading:true}
      case types.CALL_DELETE_SUCCESS :
        let newNotifis = state.notifis.filter(notifi=>notifi.id !== id)
        return{...state,notifis:newNotifis,loading:false}
        case types.ADD_NOTIFI :
          return {...state,loading : true}
          
          case types.ADD_NOTIFI_ERORR :
            return {...state,loading : false}
      case types.ADD_NOTIFI_SUCCESS :
        let addNotifi = [notifi,...state.notifis]
        return{...state,notifis:addNotifi,loading:false}

  


    default:
      return { ...state };
  }
};
export default getCategories;
