import { useState } from "react";
import "./newComment.css";
import addNewComment from "../../services/addNewComment";
import { useNavigate } from "react-router-dom";
import renderStatus from "../../Helper/renderStatus";
const NewComment = () => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [requestStatus, setRequestStatus] = useState(null);

  const changeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const postHandler = async () => {
    //! Create !
    //* name, email, content => Data That Will Pass To Request !

    try {
      setRequestStatus("Pending");
      await addNewComment({
        ...comment,
        postId: Math.floor(Math.random() * 1000),
      });

      //Todo Change PostId To CommentId

      // await fetch(
      //   "https://react-server-33f81-default-rtdb.firebaseio.com/comments.json",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(comment),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      navigate("/", { state: "new" });
    } catch (error) {
      console.log(error);
      setRequestStatus("Error");
    }
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
      <button className="btn-post" onClick={postHandler}>
        Post New Comment
      </button>
      {renderStatus(requestStatus, setRequestStatus, "Posting...", "#4cd137")}
    </div>
  );
};

export default NewComment;
