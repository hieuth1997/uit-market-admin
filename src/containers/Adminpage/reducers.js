import * as Constants from "./constant";
let initial = {
  data: [
    {
      title: "New User is registered.",
      time: "4 hours ago"
    }
  ],
  isCollaped: false
};

const adminPageReducer = (state = initial, action) => {
  switch (action.type) {
    case Constants.SET_COLAPSE:
      return { ...state, isCollaped: !state.isCollaped };
    default:
      return state;
  }
};
export default adminPageReducer;
