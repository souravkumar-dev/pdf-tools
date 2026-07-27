import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b p-4 flex justify-between">

      <Link
        to="/"
        className="font-bold"
      >
        PDF Tools
      </Link>

    </nav>
  );
}

export default Navbar;