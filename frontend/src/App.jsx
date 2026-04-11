import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import CalendarPage from './pages/Calendar';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => (
  <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar />
    <main className="flex-1 overflow-y-auto p-6">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><Layout><Clients /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Layout><CalendarPage /></Layout></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><Layout><Payments /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;