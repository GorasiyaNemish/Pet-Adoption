import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateProfile, updatePassword } from '../api/userApi';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const ProfilePage: React.FC = () => {
  const { user, login, token } = useAuth();
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name, email: user.email });
    }
  }, [user]);

  // 1. Profile Update
  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      if (response.success && token) {
        login(response.data, token); // Sync AuthContext & LocalStorage
        toast.success('Profile updated! 🐾');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Update failed.');
    }
  });

  // 2. Password Update
  const passwordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success('Password changed successfully! 🔐');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Password update failed.');
    }
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate(profileData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error('New passwords do not match.');
    }
    passwordMutation.mutate(passwordData);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Profile Settings ⚙️</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Profile Card */}
        <Card header="Personal Information">
          <form onSubmit={handleProfileSubmit}>
            <Input 
              label="Full Name" 
              value={profileData.name} 
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} 
              required 
            />
            <Input 
              label="Email Address" 
              type="email" 
              value={profileData.email} 
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} 
              required 
            />
            <Button variant="primary" type="submit" disabled={profileMutation.isPending}>
              {profileMutation.isPending ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </Card>

        {/* Password Card */}
        <Card header="Security">
          <form onSubmit={handlePasswordSubmit}>
            <Input 
              label="Current Password" 
              type="password" 
              value={passwordData.currentPassword} 
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} 
              required 
            />
            <Input 
              label="New Password" 
              type="password" 
              value={passwordData.newPassword} 
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} 
              required 
            />
            <Input 
              label="Confirm New Password" 
              type="password" 
              value={passwordData.confirmPassword} 
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} 
              required 
            />
            <Button variant="secondary" type="submit" disabled={passwordMutation.isPending}>
              {passwordMutation.isPending ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
