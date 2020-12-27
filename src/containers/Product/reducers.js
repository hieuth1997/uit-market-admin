import * as types from "./constant";

let initial = {
  loading: false,
  products: [],
  searchUser: [],
  categories: []
};
const getProduct = (state = initial, action) => {
  const { products, data, value, index } = action;
  switch (action.type) {
    case types.GET_ALL_PRODUCT:
      return { ...state, loading: true };
    case types.SHOW_ALL_PRODUCT:
      return { ...state, products: products, loading: false };
      case types.POST_STATUS_PRODUCT :
        return {...state , loading :true}
    case types.EDIT_STATUS_PRODUCT:
      console.log(index);
      let editProducts = [...state.products];

      let positionProduct = editProducts.findIndex(product => {
        return product.id === index;
      });
      console.log(value)
      editProducts[positionProduct].enabled = value;


      return { ...state, products: editProducts ,loading :false};

    default:
      return { ...state };
  }
};
export default getProduct;
