import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import { PrivateRoute, AdminRoute } from './components/AuthGuards';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PetsPage from './pages/PetsPage';
import PetDetailPage from './pages/PetDetailPage';
import UserDashboard from './pages/UserDashboard';
import AdminPetsPage from './pages/admin/AdminPetsPage';
import AdminAdoptionsPage from './pages/admin/AdminAdoptionsPage';
import useAuth from './hooks/useAuth';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
       <NavLink to="/admin/pets" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? '#6366f1' : '#64748b' })}>Manage Pets</NavLink>
       <NavLink to="/admin/adoptions" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? '#6366f1' : '#64748b' })}>Adoption Requests</NavLink>
    </div>
    {children}
  </div>
);

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
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />} />

          {/* User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Navigate to="/admin/pets" replace />} />
            <Route path="/admin/pets" element={<AdminLayout><AdminPetsPage /></AdminLayout>} />
            <Route path="/admin/adoptions" element={<AdminLayout><AdminAdoptionsPage /></AdminLayout>} />
          </Route>

          <Route path="*" element={<div><h1>404 Not Found</h1></div>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
