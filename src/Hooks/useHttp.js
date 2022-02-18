import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteComment from "../services/deleteComment";

export default function useHttp(actionType, commentPostId, setData) {
  const [requestStatus, setRequestStatus] = useState(null);
  const navigate = useNavigate();

  const sendRequest = async () => {
    if (actionType == "delete") {
      setRequestStatus("Pending");
      const itemThatWillRemove = JSON.parse(
        localStorage.getItem("selectedComment")
      );
      // http
      //   .delete(`/comments/${selectedId}`)
      //   .then((res) => http.get("/comments"))
      //   .then((res) => setComments(res.data.filter((c) => c.id !== selectedId))) //! In Real Project Forexample Before Delete We Had 10 Items After Delete
      //   //! We Will Have 9 Items And Return Is That 9 Item And We Must setState() That 9 Items And Show Updated
      //   //! Items To User !
      //   .catch((err) => console.log(err));

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
      console.log("not this");
    }
  };
  return { sendRequest, requestStatus, setRequestStatus };
}
