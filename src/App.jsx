import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import ApplyModal from "./pages/ApplyModal";



function App() {
  return (
    <>
      <Toaster position="bottom-left" />
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
