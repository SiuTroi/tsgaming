const initState = {
    products: [],
    product: {},
}


const ProductReducer = (state = initState, action) => {
    switch(action.type) {
        case"GET_ALL_PRODUCT": {
            return {
                ...state,
                products: action.payload
            }
        }
        case"GET_ONE_PRODUCT":
            return {
                ...state,
                product: state?.products?.find(pro => pro.productId === action.productid)
            }
        default:
            return state
    }
}
export default ProductReducer