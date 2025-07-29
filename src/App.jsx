import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateCrewmate from "./components/CreateCrewmate";
import SummaryPage from "./components/SummaryPage";
import EditCrewmate from "./components/EditCrewmate";
import DetailPage from "./components/DetailPage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Create</Link> | <Link to="/summary">Summary</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CreateCrewmate />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/edit/:id" element={<EditCrewmate />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}
