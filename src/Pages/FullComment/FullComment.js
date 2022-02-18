import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "./fullComment.css";
import getOneComment from "../../services/getOneComment";
import getAllComments from "../../services/getAllComments";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import deleteComment from "../../services/deleteComment";
import { hasNumber } from "../../checkHasJustNumber";
import renderStatus from "../../Helper/renderStatus";
import useHttp from "../../Hooks/useHttp";
const FullComment = () => {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const commentPostId = useLocation().state;
  const { requestStatus, sendRequest, setRequestStatus } = useHttp(
    "delete",
    { commentPostId: commentPostId },
    setData
  );
  const getComments = async () => {
    try {
      const selectedComment = await (await getOneComment(commentPostId)).data;
      localStorage.setItem("selectedComment", JSON.stringify(selectedComment));
      setData(selectedComment);
    } catch (error) {
      const commentsLength = await getAllComments().then(
        (res) => res.data.length
      );
      if (commentPostId > commentsLength || !hasNumber(commentPostId)) {
        setErrorMessage("There Is No Comments... !");
      }
    }
  };

  useEffect(() => {
    getComments();
  }, [commentPostId]);

  const style = {
    color: "#444",
    backgroundColor: "#efefef",
    padding: "10px",
  };

  return (
    <div className="fullComment">
      {data ? (
        <>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Description: {data.content}</p>
          <button className="btn-delete" onClick={sendRequest}>
            Delete
          </button>
          {renderStatus(
            requestStatus,
            setRequestStatus,
            "Deleting...",
            "#e84118"
          )}
        </>
      ) : (
        <h1 style={style}>{errorMessage ? errorMessage : "Loading..."}</h1>
      )}
    </div>
  );
};

export default FullComment;
