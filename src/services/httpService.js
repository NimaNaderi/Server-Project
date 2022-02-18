import axios from "axios";

axios.defaults.baseURL =
  "https://react-server-33f81-default-rtdb.firebaseio.com";

//! Interceptor => Ye Jor Gate Baraye Request Ha Va Response Haye Ma Hastesh Ke Mitonim Ro Request Ha Ya Response
//! Ha Taghirati Ro Ijad Konim Va Bad Ersal Ya Daryafteshon Konim ! Edit Or ...
//* Bishtar Baraye Manage Request Ha Ghable Ersal Ya Response Ha Va Error Ha Hastesh !

axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (res) => {
    const req = res.config;

    !res.data
      ? localStorage.setItem("hasItem", false)
      : localStorage.removeItem("hasItem");

    if (req.url.includes("comments.json")) {
      const commentArray = [];
      for (const key in res.data) {
        commentArray.push({
          id: key,
          content: res.data[key].content,
          name: res.data[key].name,
          email: res.data[key].email,
          postId: res.data[key].postId,
        });
      }
      localStorage.setItem("comments", JSON.stringify(commentArray));
      return commentArray;
    }
    return res;
  },
  (error) => {
    return Promise.reject();
  }
);

axios.interceptors.request.use(
  (request) => {
    request.headers = { ...request.headers, A: "A" };
    console.log(request.url, request.baseURL);
    return request;
  },
  (error) => {
    return Promise.reject();
  }
);

const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};

export default http;
