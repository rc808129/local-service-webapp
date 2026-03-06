import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import WorkerProfileSetup from './components/WorkerProfileSetup';
import MyWorkerProfile from './components/MyWorkerProfile';
import EditProfile from './components/EditProfile';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Dashboard />} />
    <Route path="/signup" element={<Dashboard />} />
    <Route path="/login" element={<Dashboard />} />

    <Route path="/workers" element={<WorkerProfileSetup />} />
    <Route path="/my-profile" element={<MyWorkerProfile />} />
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route path="/search/:skill" element={<SearchResults />} />
   

  
      </Routes>
    </Router>
  );
}

export default App;