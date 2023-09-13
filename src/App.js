import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import { AuthProvider } from './Components/Contexts/AuthContext';
import ProtectedRoute from './Components/Contexts/ProtectedRoute';
import Home from './Components/Home/Home';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
