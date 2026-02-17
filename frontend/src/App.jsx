import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import WorkerProfileSetup from './components/WorkerProfileSetup';
import MyWorkerProfile from './components/MyWorkerProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
        <Route path='/' element={<Dashboard/>}>
         <Route path="signup" element={<Dashboard />} />
         <Route path="/login" element={<Dashboard />} />
        </Route>
        <Route path='/workers' element={<WorkerProfileSetup/>}/>
        <Route path='/my-profile' element={<MyWorkerProfile/>}/>
        {/* बाद में: <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;