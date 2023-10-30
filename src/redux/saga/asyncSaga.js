
import { call, put, takeLatest } from "redux-saga/effects";
import { ref, child, get } from "firebase/database";
import { database } from "../../firebase";

const dbRef = ref(database);
const getUserAsync = async () => {
  const userRespone = await get(child(dbRef, `users`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    }
  });
  return userRespone;
};

const getProductDataAsync = async () => {
  const productDataRespone = await get(child(dbRef, `product_data`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    }
  });
  return productDataRespone;
};

function* getData() {
  const userData = yield call(getUserAsync);
  const product_data = yield call(getProductDataAsync);

  yield put({
    type: "GET_USER_DATA",
    payload: userData,
  });
  yield put({
    type: "GET_PRODUCT_DATA",
    payload: product_data,
  });
}

function* callApiAsync() {
  yield takeLatest("GET_DATA", getData);
}
export default callApiAsync;