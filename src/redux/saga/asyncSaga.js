import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

const getProductAsync = async () => {
  const respone = await axios.get("https://api.npoint.io/beef3d4f5c122e5a014a");
  const data = await respone.data;
  return data;
};

function* getData() {
  const data = yield call(getProductAsync);

  yield put({
    type: "GET_ALL_PRODUCT",
    payload: data,
  });
}

function* callApiAsync() {
  yield takeLatest("GET_PRODUCT", getData);
}
export default callApiAsync;