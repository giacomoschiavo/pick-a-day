import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/routes/Home";
import Create from "./components/routes/Create";
import Vote from "./components/routes/Vote";
import Header from "./components/ui/Header";
import Results from "./components/routes/Results";
import CenteredContainer from "./components/container/CenteredContainer";

function App() {
  return (
    <>
      <CenteredContainer>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<Vote />} />
            <Route path="/:id/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
      </CenteredContainer>
    </>
  );
}

export default App;
