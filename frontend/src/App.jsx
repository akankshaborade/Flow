import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Payments from './pages/Payments';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

import './components/Layout.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/clients"   element={<PrivateRoute><Clients /></PrivateRoute>} />
          <Route path="/projects"  element={<PrivateRoute><Projects /></PrivateRoute>} />
          <Route path="/tasks"     element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/payments"  element={<PrivateRoute><Payments /></PrivateRoute>} />
          <Route path="/calendar"  element={<PrivateRoute><Calendar /></PrivateRoute>} />
          <Route path="/settings"  element={<PrivateRoute><Settings /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}