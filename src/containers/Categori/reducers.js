import * as types from "./constant";

let initial = {
  loading: false,
  categories : []
};

const getCategories = (state = initial, action) => {
  const { products, data, value, categories ,categorie,id } = action;
  switch (action.type) {
    case types.SHOW_ALL_CATEGORIES :
      
      return {...state,categories:categories,loading:false}
      case types.GET_ALL_CATEGORIES :
        return {...state,loading:true}
        case types.ADD_CATEGORIES:
          return {...state,loading:true}
        case types.ADD_CATEGORIES_SUCCESS :
          let newCategories = [categorie,...state.categories]
          return {...state,categories:newCategories,loading:false}
          case types.DELETE_CATE:
            return{...state,loading:true}
          case types.DELETE_CATE_SUSSESS :
            let newCate = state.categories.filter(notifi=>notifi.id !== id)
            return{...state,categories:newCate,loading:false}
            case types.DELETE_CATE_FAIL :
              return{...state,loading:false}
            
          
  


    default:
      return { ...state };

  }
};
export default getCategories;
