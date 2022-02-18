import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Create from "./components/routes/Create";
import Vote from "./components/routes/Vote";
import Results from "./components/routes/Results";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<Create />} />
      <Route path="/:id" element={<Vote />} />
      <Route path="/:id/results" element={<Results />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
