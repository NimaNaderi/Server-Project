import axios from "axios";

//? Baraye Vaghti Ke Request Hamon Fargh Dare Ba Baghie Request Ha Masalan API Fargh Dare Ya URL Fargh Dare O ....

//! Ye Instance Az Axios Hastesh Dar Vaghe Ye Axios Jadid ! (Customize Shode)
const axiosInstance = axios.create({
  baseURL: "https://react-server-33f81-default-rtdb.firebaseio.com/",
});

axiosInstance.defaults.headers.common["UserName"] = "NIMA";

export default axiosInstance;
