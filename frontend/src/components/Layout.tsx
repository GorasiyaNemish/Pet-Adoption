import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from './Button';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      {/* Navbar section */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <NavLink to="/" className={styles.logo}>
            <span>🐾</span> PetAdopt
          </NavLink>
          
          <div className={styles.navLinks}>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
            <NavLink to="/pets" className={({ isActive }) => isActive ? styles.active : ''}>Browse Pets</NavLink>
            {isAuthenticated && !isAdmin && (
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>Dashboard</NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ''}>Admin Dashboard</NavLink>
            )}
          </div>

          <div className={styles.actions}>
            {!isAuthenticated ? (
              <>
                <NavLink to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </NavLink>
              </>
            ) : (
              <>
                <span className={styles.userInfo}>Hello, <strong>{user?.name}</strong></span>
                <Button variant="danger" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>

      {/* Footer section */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} PetAdopt Management System. All rights reserved.
          </div>
          <div className={styles.footerLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="mailto:contact@petadopt.com">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
