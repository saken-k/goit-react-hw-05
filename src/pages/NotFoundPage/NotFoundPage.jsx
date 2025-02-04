import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Page not Found</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};
export default NotFoundPage;
