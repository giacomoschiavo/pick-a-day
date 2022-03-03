import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/routes/Home";
import Create from "./components/routes/Create";
import Vote from "./components/routes/Vote";
import Header from "./components/ui/Header";
import Results from "./components/routes/Results";
import NotFound from "./components/routes/NotFound";
import Footer from "./components/ui/Footer";
import CenteredContainer from "./components/container/CenteredContainer";
import axios from "axios";

axios.defaults.baseURL = "https://pick-a-day.herokuapp.com";

function App() {
  return (
    <div>
      <CenteredContainer>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<Vote />} />
            <Route path="/:id/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CenteredContainer>
      <Footer />
    </div>
  );
}

export default App;
