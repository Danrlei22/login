import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './components/UserList';
import ResetPassword from './pages/ResetPassword';


/* 
************ROTAS DO SITE***********

http://localhost:3000/login - Front-end Login page

http://localhost:3000/register - Front-end Register page

http://localhost:3000/users - Front-end API List users

http://localhost:5000/api/users - Back-End API List users

http://localhost:3000/reset-password - Front-end Reset Password page
*/

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/users" element={<UserList />} />

      </Routes>
    </Router>
  );
}

export default App;
