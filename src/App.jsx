import { Routes, Route } from "react-router-dom";
import { StatsProvider } from "./lib/StatsContext.jsx";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Result from "./pages/Result.jsx";

export default function App() {
  return (
    <StatsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </StatsProvider>
  );
}
