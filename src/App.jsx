import { useState } from "react";
import "./App.css";
import ItunesMusic from "./components/ItunesMusic";
import Recommend from "./components/Recommend";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  return (
    <div className="App">
      <Recommend setRecommendations={setRecommendations} />
      <ItunesMusic recommendations={recommendations} />
    </div>
  );
}
export default App;
