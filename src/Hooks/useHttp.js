import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addNewComment from "../services/addNewComment";
import deleteComment from "../services/deleteComment";

export default function useHttp(
  actionType,
  { commentPostId, comment },
  setData
) {
  const [requestStatus, setRequestStatus] = useState(null);
  const navigate = useNavigate();

  const sendRequest = async () => {
    if (actionType === "delete") {
      setRequestStatus("Pending");
      const itemThatWillRemove = JSON.parse(
        localStorage.getItem("selectedComment")
      );

      try {
        await deleteComment(commentPostId);
        navigate("/", {
          state: { status: "delete", data: itemThatWillRemove },
        });
        localStorage.removeItem("selectedComment");
      } catch (error) {
        setRequestStatus("Error");
        setData(null);
      }
    } else {
      //! Create !
      //* name, email, content => Data That Will Pass To Request !

      try {
        setRequestStatus("Pending");
        await addNewComment({
          ...comment,
          postId: Math.floor(Math.random() * 1000),
        });

        navigate("/", { state: "new" });
      } catch (error) {
        setRequestStatus("Error");
      }
    }
  };
  return { sendRequest, requestStatus, setRequestStatus };
}
