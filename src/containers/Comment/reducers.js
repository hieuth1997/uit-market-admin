import * as types from "./constant";

let initial = {
  loading: false,
  comments : []
};

const getComment = (state = initial, action) => {
  const { products, data, value, index } = action;
  switch (action.type) {
    case types.SHOW_ALL_COMMENT :
       let comments = action.comments;
      //  let data = comments.map(comment=>{
      //   let user = users.find(user => user.id === comment.userId)
      //    let userName =user.username;
      //    let result = {...comment,userName : userName}
      //    return result
      //  })
      return {...state,comments:comments,loading:false}
      case types.GET_ALL_COMMENT :
        return {...state,loading:true}
      case types.EDIT_STATUS_COMMENT :
        return {...state,loading:true}
      case types.EDIT_SUCESS_COMMENT : 
      return {...state,loading :false}
  


    default:
      return { ...state };
  }
};
export default getComment;
