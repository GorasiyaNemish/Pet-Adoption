import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import { PrivateRoute, AdminRoute } from './components/AuthGuards';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import useAuth from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      />
      
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<div style={{ textAlign: 'center', padding: '100px 0' }}><h1>Welcome to PetAdopt</h1><p>Our premium pet adoption platform is live!</p></div>} />
          <Route path="/pets" element={<div><h1>Browse Pets</h1><p>Listing all pets here...</p></div>} />
          <Route path="/pets/:id" element={<div><h1>Pet Details</h1></div>} />
          
          {/* Auth Routes - redirect if already logged in */}
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />} />

          {/* User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<div><h1>User Dashboard - My Applications</h1></div>} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<div><h1>Admin Dashboard - Manage Pets & Adoptions</h1></div>} />
          </Route>

          <Route path="*" element={<div><h1>404 Not Found</h1></div>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
