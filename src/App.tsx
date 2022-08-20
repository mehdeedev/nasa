import "./App.css";
import { Routes, Route } from "react-router-dom";
import { List } from "./pages/list";
import { Show } from "./pages/show";
import { Header } from "./components";

function App() {
  return (
    <div className="App bg-gray-50 min-h-full">
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/show/:nasaId" element={<Show />} />
      </Routes>
    </div>
  );
}

export default App;
