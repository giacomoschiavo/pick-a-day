import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/routes/Home";
import Create from "./components/routes/Create";
import Vote from "./components/routes/Vote";
import Results from "./components/routes/Results";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Vote />} />
        <Route path="/:id/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
