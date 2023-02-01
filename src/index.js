/* Import Dependencies */
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Import Components */
import App from './App';


axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);