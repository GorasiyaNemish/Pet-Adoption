import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchMyAdoptions } from '../api/adoptionApi';
import ApplicationCard from '../components/ApplicationCard';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

const UserDashboard: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['my-adoptions'],
    queryFn: fetchMyAdoptions
  });

  const applications = data?.data || [];

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '150px' }}><Spinner size="lg" /></div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>My Adoption Dashboard 🐾</h1>
        <p style={{ color: '#64748b' }}>Track your applications and status updates here.</p>
      </div>

      {isError ? (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#ef4444' }}>
          <h3>Oops! Something went wrong loading your dashboard.</h3>
          <Link to="/"><Button variant="secondary">Back to Home</Button></Link>
        </div>
      ) : applications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🐾</span>
          <h3>You haven't applied to adopt any pets yet.</h3>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Ready to find your new best friend?</p>
          <Link to="/pets"><Button variant="primary">Browse Pets</Button></Link>
        </div>
      ) : (
        <div>
          {applications.map(app => (
            <ApplicationCard key={app._id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
