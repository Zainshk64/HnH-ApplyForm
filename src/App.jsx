import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import ApplyModal from "./pages/ApplyModal";



function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<ApplyModal />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
