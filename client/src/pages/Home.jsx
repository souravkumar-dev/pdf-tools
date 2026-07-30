import { Link } from "react-router-dom";
import {
  Minimize2,
  Combine,
  FileText,
  Zap,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Layout from "../layouts/Layout";
import FeatureCard from "../components/common/FeatureCard";

function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-6 py-10">
        <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          <Sparkles size={16} />
          <span>Fast • Secure • Free</span>
        </div>
        <div className="flex items-center gap-3">
          <FileText size={42} className="text-red-500" />

          <h1 className="text-5xl font-bold text-gray-800">PDF Tools</h1>
        </div>

        <p className="mt-3 max-w-xl text-center text-lg leading-relaxed text-gray-600">
          Compress and merge PDF files quickly, securely, and completely offline
          using a fast, modern interface.
        </p>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <Link
            to="/compress"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-8 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:border-blue-400 md:w-80"
          >
            <Minimize2 size={24} className="text-blue-600" />

            <div>
              <h2 className="font-semibold">Compress PDF</h2>

              <p className="text-sm text-gray-500">Reduce PDF file size</p>
            </div>
          </Link>

          <Link
            to="/merge"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-8 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:border-blue-400 md:w-80"
          >
            <Combine size={24} className="text-blue-600" />

            <div>
              <h2 className="font-semibold">Merge PDFs</h2>

              <p className="text-sm text-gray-500">
                Combine multiple PDFs into one
              </p>
            </div>
          </Link>
        </div>
        <div className="mt-16 w-full max-w-5xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Why Choose PDF Tools?
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Zap size={36} className="text-yellow-500" />}
              title="Fast Processing"
              description="Compress and merge PDFs in just a few seconds."
            />

            <FeatureCard
              icon={<ShieldCheck size={36} className="text-green-600" />}
              title="Secure & Private"
              description="Your files are processed securely and are never shared."
            />

            <FeatureCard
              icon={<Smartphone size={36} className="text-blue-600" />}
              title="Responsive Design"
              description="Works seamlessly on desktop, tablet, and mobile devices."
            />
          </div>
        </div>
        <footer className="mt-20 border-t border-gray-200 pt-8 pb-4 text-center text-sm text-gray-500 w-full">
          <p>© 2026 PDF Tools. All rights reserved.</p>

          <p className="mt-2">
            Built with React, Node.js, Express.js and Tailwind CSS.
          </p>
        </footer>
      </div>
    </Layout>
  );
}

export default Home;
