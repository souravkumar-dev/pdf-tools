import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

function NotFound() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">

      <h1 className="text-5xl font-bold">
        404
      </h1>

      <p>Page Not Found</p>

      <Link
        to="/"
        className="border px-5 py-2 rounded"
      >
        Go Home
      </Link>

    </div>
    </Layout>
  );
}

export default NotFound;