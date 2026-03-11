import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayouts';
import Campaign from './pages/Campaign';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="campaigns" element={<Campaign />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;