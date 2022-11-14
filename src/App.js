import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './main.css';

/* Import Components */
import './templates/home/Home'


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
