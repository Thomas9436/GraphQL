import './App.css'
import { Routes, Route } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";

function App() {

  return (
    <Routes>
      <Route path="/" element={<CharacterList />} />
      <Route path="/character/:id" element={<CharacterDetails />} />
    </Routes>
  )
}

export default App
