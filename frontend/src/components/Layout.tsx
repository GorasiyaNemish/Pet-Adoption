import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
          </div>

          <div className={styles.actions}>
            {/* These will be conditional based on auth later */}
            <NavLink to="/login" className={styles.link}>Login</NavLink>
            <NavLink to="/register" className={styles.link}>Register</NavLink>
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
