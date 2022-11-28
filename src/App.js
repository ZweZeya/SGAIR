import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import DataPage from './components/DataPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/data" element={<DataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
