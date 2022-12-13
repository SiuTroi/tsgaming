const initState = {
    products: [],
    product: {
        "price": 23.99,
        "imageUrl": "https://res.cloudinary.com/dyotzt92h/image/upload/v1632673370/Fsoft-academy/favpng_vitamin-c-vitamin-e-serum-skin_s1igc2.png",
        "productId": "1",
        "description": "Serum for Face, Topical Facial Serum without Hyalutronic Acid & Vitamin E",
        "productName": "True Skin Vitamin C"
    },
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
                product: state?.products?.find(pro => pro.productName === action.productname)
            }
        default:
            return state
    }
}
export default ProductReducer