import { useState } from "react";
import "./App.css";
import ItunesMusic from "./components/ItunesMusic";
import Recommend from "./components/Recommend";
import ManiaDBTest from "./testfiles/ManiaDBTest";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  return (
    <div className="App">
      {/* <Recommend setRecommendations={setRecommendations} />
      <ItunesMusic recommendations={recommendations} /> */}
      <ManiaDBTest />
    </div>
  );
}
export default App;
