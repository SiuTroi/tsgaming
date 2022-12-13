import { createStore, combineReducers, applyMiddleware  } from "redux"
import reduxSaga from "redux-saga";
import callApiAsync from "../saga/asyncSaga";
import ProductReducer from "../reducer/ProductReducer"
import CartReducer from "../reducer/CartReducer"
import UserReducer from "../reducer/UserReducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const middleware =reduxSaga()
const root = combineReducers({
    ProductReducer,
    CartReducer, 
    UserReducer
})

const persistedReducer = persistReducer(persistConfig, root)

const store = createStore(persistedReducer, applyMiddleware(middleware));
export const persistor = persistStore(store)
middleware.run(callApiAsync);
export default store