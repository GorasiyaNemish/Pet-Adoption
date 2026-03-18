import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

function App() {
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
          <Route path="/" element={<div style={{ textAlign: 'center', padding: '100px 0' }}><h1>Welcome to PetAdopt</h1><p>Our premium pet adoption platform is coming soon!</p></div>} />
          <Route path="/pets" element={<div><h1>Browse Pets</h1><p>Listings will appear here...</p></div>} />
          <Route path="/login" element={<div><h1>Login</h1></div>} />
          <Route path="/register" element={<div><h1>Register</h1></div>} />
          <Route path="*" element={<div><h1>404 Not Found</h1></div>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
