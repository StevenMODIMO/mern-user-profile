import { Routes, Route, Navigate } from 'react-router-dom'
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from './pages/Register'
import Login from './pages/Login';
import { useAuth } from './context/AuthContext'

function App() {
  const { user } = useAuth()
  return (
  <div className="App">
    <Navbar />
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to='/register' />} />
      <Route  path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
      <Route />
    </Routes>
  </div>)
}

export default App;
