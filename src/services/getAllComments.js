import http from "./httpService";

const getAllComments = () => http.get("/comments.json");
export default getAllComments;
