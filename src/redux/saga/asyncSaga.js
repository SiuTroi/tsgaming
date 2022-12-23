import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ref, child, get } from "firebase/database";
import { database } from "../../firebase";
const getProductAsync = async () => {
  const respone = await axios.get("https://api.npoint.io/beef3d4f5c122e5a014a");
  const data = await respone.data;
  return data;
};

const dbRef = ref(database);
const getUserAsync = async () => {
  const userRespone = await get(child(dbRef, `users`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    }
  });
  return userRespone;
};

function* getData() {
  const productData = yield call(getProductAsync);
  const userData = yield call(getUserAsync);

  yield put({
    type: "GET_ALL_PRODUCT",
    payload: productData,
  });
  yield put({
    type: "GET_USER_DATA",
    payload: userData,
  });
}

function* callApiAsync() {
  yield takeLatest("GET_DATA", getData);
}
export default callApiAsync;