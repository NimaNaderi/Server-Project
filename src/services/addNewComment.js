import http from "./httpService";

const token = "SECURE_TOKEN !";

const header = {
  headers: {
    // Authorization: `Bearer ${token}`,
  },
};

const addNewComment = (commentData) => http.post("/comments.json", commentData);

export default addNewComment;
