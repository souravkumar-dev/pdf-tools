import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

function Home() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold">PDF Tools</h1>

        <Link to="/compress" className="border px-6 py-3 rounded">
          Compress PDF
        </Link>

        <Link to="/merge" className="border px-6 py-3 rounded">
          Merge PDFs
        </Link>
      </div>
    </Layout>
  );
}

export default Home;
