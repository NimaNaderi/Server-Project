import http from "./httpService";
import axiosInstance from "../axiosInstance";

const deleteComment = (commentId) => http.delete(`/comments/${commentId}.json`);

export default deleteComment;
