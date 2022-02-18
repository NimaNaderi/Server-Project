import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <p>Here Is NotFoundPage</p>
      <Link to={"/"}> Go To Home Page !</Link>
    </>
  );
};

export default NotFoundPage;
