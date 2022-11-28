import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './main.css';

/* Import Components */
import Home from './templates/home/Home'
import Results from "templates/results/Results";
import Test from "templates/home/Test";


const App = () => {
  return (
    <div className="App h-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
