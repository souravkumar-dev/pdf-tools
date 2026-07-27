import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Compress from "./pages/Compress";
import Merge from "./pages/Merge";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/compress" element={<Compress />} />

        <Route path="/merge" element={<Merge />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;