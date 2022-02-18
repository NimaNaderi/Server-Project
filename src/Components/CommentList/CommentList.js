import { useEffect, useReducer, useState } from "react";
import Comment from "./Comment/Comment";

import { toast } from "react-toastify";
import { Badge, Skeleton, Stack } from "@mui/material";

import getAllComments from "../../services/getAllComments";

import "./commentList.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import addNewComment from "../../services/addNewComment";
import { CommentRounded } from "@mui/icons-material";
import { common } from "../../Helper/Common";

const initialState = {
  errorStatus: false,
  mustProcessAgain: false,
};

const reducerFn = (state, action) => {
  return action.data;
};

const CommentList = () => {
  //! Variables Section Start =>
  let response;
  console.log(response);
  //Todo Have Some Refactor... :D
  const [comments, setComments] = useState(null);
  const [showToasts, setShowToasts] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [processDataState, processDataDispatch] = useReducer(
    reducerFn,
    initialState
  );
  const appTheme = common.appTheme;
  const toastTheme = appTheme == "dark" ? "dark" : "colored";
  // How To Get Data =>
  // 1. useEffect() => HTTP !
  // 2. CDM => Get !

  //! <= Variables Section End

  //! UseEffects Section Start =>

  useEffect(() => {
    if (location.state) {
      if (location.state.status === "delete") {
        const itemToRestore = location.state.data;
        toast.warning("Comment Deleted ! Click To Restore !", {
          toastId: "delete",
          theme: toastTheme,
          autoClose: 3500,
          onClick: async () => undoHandler(itemToRestore),
        });
      } else if (location.state === "new") {
        toast.success("New Comment Added Successfully !", {
          toastId: "new",
          theme: toastTheme,
          autoClose: 3000,
        });
      }
      //! Here When We Navigated To "/" , All Of The States Will Be Cleared And This If Will Not Called Because Location Changed And The There Is No
      //! State And It Means Null !
      navigate("/");
      setShowToasts(false);
    }
    location.state !== "Navigated" && processData();
  }, []);

  useEffect(() => {
    if (location.state === "Navigated")
      setComments(JSON.parse(localStorage.getItem("comments")));
  }, [comments]);

  useEffect(() => {
    if (processDataState.mustProcessAgain) {
      processData();
      processDataDispatch({
        type: "PROCESS_AGAIN",
        data: { errorStatus: false, mustProcessAgain: false },
      });
    }
  }, [processDataState]);

  //! UseEffects Section End =>

  //! Functions Section Start =>

  const processData = async () => {
    const getComments = async () => {
      try {
        response = await getAllComments();
        setComments(response);
      } catch (error) {
        processDataDispatch({
          type: "PROCESS_AGAIN",
          data: { errorStatus: true, mustProcessAgain: false },
        });
        return Promise.reject();
      }
    };
    if (!location.state) {
      toast.promise(
        getComments,
        {
          pending: {
            render: "Receiving Data From Server...",
            closeOnClick: false,
            onClick: () => {
              return;
            },
          },
          success: localStorage.getItem("hasItem")
            ? { type: "warning", render: "There Is No Comments !" }
            : "Data Received Successfully 👌",
          error: "Error In Receive Data From Server ! 🤯 Click To Try Again",
        },
        {
          autoClose: 2800,
          theme: toastTheme,
          onClick: () => {
            response === undefined &&
              processDataDispatch({
                type: "PROCESS_AGAIN",
                data: { errorStatus: true, mustProcessAgain: true },
              });
          },
        }
      );
    } else getComments();
  };

  const undoHandler = async (itemToRestore) => {
    await addNewComment(itemToRestore);
    processData();
    toast.success("Comment Restored !", {
      toastId: "undo",
      theme: toastTheme,
      autoClose: 2500,
    });
  };

  const selectHandler = (id) => {
    // navigate(`/comments/${id}`);
    console.log(id);
  };

  const renderComments = () => {
    const skeletons = [];
    for (let i = 0; i < 5; i++) {
      skeletons.push(
        <Skeleton
          variant="rectangular"
          width={200}
          height={200}
          animation={"wave"}
          style={{
            borderRadius: 10,
            backgroundColor: appTheme == "dark" && "#dcdde1",
            opacity: "50%",
          }}
        />
      );
    }
    let renderValue = location.state !== "Navigated" && <>{skeletons}</>;

    if (processDataState.errorStatus) {
      renderValue = <h1 style={{ color: "red" }}>Receiving Data Failed !</h1>;
    }

    if (comments && !processDataState.error) {
      if (showToasts && comments.length > 0) {
        toast.info("To See Full Post, Just Click On It", {
          toastId: "info",
          autoClose: 4000,
          theme: toastTheme,
        });
      }
      if (comments.length > 0) {
        renderValue = comments.map((c) => (
          <Link state={c.id} to={`/comment/${c.postId}`} key={c.postId}>
            <Comment name={c.name} email={c.email} body={c.body} />
          </Link>
        ));
      } else renderValue = <h2>There Is No Comments At This Time :(</h2>;
    }

    return renderValue;
  };

  //! Functions Section End =>

  return (
    <>
      <section>
        <Badge
          showZero={true}
          badgeContent={comments !== null && comments.length}
          color="info"
        >
          <CommentRounded color="action" />
        </Badge>
      </section>

      <section>{renderComments()}</section>
    </>
  );
};

export default CommentList;
