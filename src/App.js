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
import styled from "styled-components";

axios.defaults.baseURL = "https://pick-a-day.herokuapp.com";

const MainContainer = styled.div``;

function App() {
  return (
    <MainContainer>
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
    </MainContainer>
  );
}

export default App;
