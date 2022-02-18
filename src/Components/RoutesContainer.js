import { useRoutes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import NewComment from "../Pages/NewComment/NewComment";
import NotFoundPage from "../Pages/NotFoundPage";
import FullComment from "../Pages/FullComment/FullComment";

const RoutesContainer = () => {
  return useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/new-comment", element: <NewComment /> },
    { path: "/comment/:id", element: <FullComment /> },
    { path: "*", element: <NotFoundPage /> },
  ]);
};

export default RoutesContainer;
