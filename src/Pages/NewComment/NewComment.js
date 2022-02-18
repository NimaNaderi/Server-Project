import { useState } from "react";
import "./newComment.css";
import addNewComment from "../../services/addNewComment";
import { useNavigate } from "react-router-dom";
import renderStatus from "../../Helper/renderStatus";
import useHttp from "../../Hooks/useHttp";
const NewComment = () => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    content: "",
  });
  
  const { requestStatus, sendRequest, setRequestStatus } = useHttp("new", {
    comment: comment,
  });

  const changeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  return (
    <div className="newComment">
      <h1>Add New Comment</h1>
      <div>
        <label>Name</label>
        <input name="name" type="text" onChange={changeHandler}></input>
      </div>
      <div>
        <label>Email</label>
        <input name="email" type="email" onChange={changeHandler}></input>
      </div>
      <div>
        <label>Body</label>
        <input name="content" type="textarea" onChange={changeHandler}></input>
      </div>
      <button className="btn-post" onClick={sendRequest}>
        Post New Comment
      </button>
      {renderStatus(requestStatus, setRequestStatus, "Posting...", "#4cd137")}
    </div>
  );
};

export default NewComment;
