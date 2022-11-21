import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './main.scss';

/* Import Components */
import Home from './templates/home/Home'
import Results from "templates/results/Results";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
