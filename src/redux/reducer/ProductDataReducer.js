const productDataInit = {
  productData: [],
  product: {},
};

const ProductDataReducer = (state = productDataInit, action) => {
  switch (action.type) {
    case "GET_PRODUCT_DATA":
      return {
        ...state,
        productData: action.payload,
      };
    case "CREATE_NEW_PRODUCT":
      const {
        productName,
        productPrice,
        productImage,
        productLink,
        productDescription,
        discount,
        sponsorAvatar,
        sponsorName,
      } = action.payload;
      return {
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
        productLink: productLink,
        productDescription: productDescription,
        discount: discount,
        sponsorAvatar: sponsorAvatar,
        sponsorName: sponsorName,
      };
    case "GET_ONE_PRODUCT":
      return {
        ...state,
        product: state?.productData?.find(
          (pro) => pro.productName === action.productName
        ),
      };
    default:
      return state;
  }
};

export default ProductDataReducer;
