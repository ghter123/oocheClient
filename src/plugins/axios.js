import axios from 'axios';

axios.interceptors.response.use(response => {
  console.log(response);
  if (response.status === 200) {
    response = response.data;
    if (!response.respCode) return response;
    if (response.respCode === '0' || response.respCode === '2000') {
      return response.data;
    } else {
      return Promise.reject(new Error(response.message));
    }
  } else {
    return Promise.reject(new Error("网络异常！请稍后重试。"));
  }
}, err => {
  err.message = '网络异常！请稍后重试。';
  return Promise.reject(err);
});

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
