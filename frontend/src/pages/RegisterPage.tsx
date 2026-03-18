import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { register } from '../api/authApi';
import Button from '../components/Button';
import Input from '../components/Input';
import styles from './Auth.module.scss';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        authLogin(response.data, response.data.token);
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Join PetAdopt</h1>
        <p className={styles.subtitle}>Help find new homes for our adorable friends</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="e.g. john@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <Button 
            variant="primary" 
            fullWidth 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div className={styles.footer}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
