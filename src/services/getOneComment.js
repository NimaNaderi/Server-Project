import http from "./httpService";

const getOneComment = (commentId) => http.get(`/comments/${commentId}.json`);

export default getOneComment;
