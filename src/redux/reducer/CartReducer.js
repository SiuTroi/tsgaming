const initState = {
  products: [],
  totalPrice: 0,
  totalQuantities: 0,
};

const CartReducer = (state = initState, action) => {
  let findPro;
  let index;
  switch (action.type) {
    case "ADD_TO_CART":
      const { product, quantity } = action.payload;
      const check = state.products.find((pr) => pr.productId === product.productId);
      if (check) {
        product.quantity = product?.quantity + quantity;
        return {
          ...state,
          totalPrice: state.totalPrice + check.price * quantity,
          totalQuantities: state.totalQuantities + quantity
        }
      } else {
        const Tprice = state.totalPrice + product.price * quantity;
        const Tquantities = state.totalQuantities + quantity;
        product.quantity = quantity;

        return {
          ...state,
          products: [...state.products, product],
          totalPrice: Tprice,
          totalQuantities: Tquantities,
        };
      }
    case "INCREASE":
      findPro = state.products.find((pr) => pr.productId === action.payload);
      index = state.products.findIndex((pr) => pr.productId === action.payload);
      if(findPro.quantity < 99) {
        findPro.quantity += 1;
        state.products[index] = findPro;
        return {
          ...state,
          totalPrice: state.totalPrice + findPro.price,
          totalQuantities: state.totalQuantities + 1,
        };
      } else {
        return state
      }
    case "DECREASE":
      findPro = state.products.find((pr) => pr.productId === action.payload);
      index = state.products.findIndex((pr) => pr.productId === action.payload);
      if (findPro.quantity > 1) {
        findPro.quantity -= 1;
        state.products[index] = findPro;
        return {
          ...state,
          totalPrice: state.totalPrice - findPro.price,
          totalQuantities: state.totalQuantities - 1,
        };
      } else {
        return state;
      }
    case "REMOVE":
      findPro = state.products.find((pr) => pr.productId === action.payload);
      const filter = state.products.filter((pr) => pr.productId !== action.payload);
      return {
        ...state,
        products: filter,
        totalPrice: state.totalPrice - findPro.price * findPro.quantity,
        totalQuantities: state.totalQuantities - findPro.quantity,
      };
    case "RESET_CART": 
      return {
        products: [],
        totalPrice: 0,
        totalQuantities: 0
      }
    default:
      return state;
  }
};

export default CartReducer;
