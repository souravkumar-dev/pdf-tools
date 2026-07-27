import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

function Merge() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">

      <h1 className="text-3xl font-bold">
        Merge PDFs
      </h1>

      <Link
        to="/"
        className="border px-5 py-2 rounded"
      >
        Back Home
      </Link>

    </div>
    </Layout>
  );
}

export default Merge;