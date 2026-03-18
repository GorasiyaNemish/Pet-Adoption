import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchPetById } from '../api/petApi';
import { applyForAdoption, fetchMyAdoptions } from '../api/adoptionApi';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Spinner from '../components/Spinner';
import styles from './PetDetail.module.scss';

const PetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // 1. Fetch Pet Details
  const { data: petData, isLoading: isPetLoading, isError } = useQuery({
    queryKey: ['pets', id],
    queryFn: () => fetchPetById(id!)
  });

  // 2. Fetch User's Adoptions (if logged in)
  const { data: myAdoptions } = useQuery({
    queryKey: ['my-adoptions'],
    queryFn: fetchMyAdoptions,
    enabled: isAuthenticated
  });

  // 3. Adoption Mutation
  const mutation = useMutation({
    mutationFn: () => applyForAdoption(id!),
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Your application has been submitted! 🐾');
        queryClient.invalidateQueries({ queryKey: ['pets', id] });
        queryClient.invalidateQueries({ queryKey: ['my-adoptions'] });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to submit application.';
      toast.error(message);
    }
  });

  const pet = petData?.data;
  const alreadyApplied = myAdoptions?.data.some(app => 
    (typeof app.pet === 'string' ? app.pet : app.pet._id) === id
  );

  if (isPetLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '150px' }}><Spinner size="lg" /></div>;
  if (isError || !pet) return <div style={{ textAlign: 'center', padding: '100px' }}><h3>Pet not found. 🐾</h3><Link to="/pets"><Button variant="secondary">Go Back</Button></Link></div>;

  return (
    <div className={styles.container}>
      {/* Image Section */}
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
           {pet.photoUrl ? (
             <img src={pet.photoUrl} alt={pet.name} />
           ) : (
             <div className={styles.placeholder}>🐾</div>
           )}
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        <div className={styles.header}>
           <Link to="/pets" style={{ textDecoration: 'underline', fontSize: '0.875rem', color: '#6366f1', display: 'block', marginBottom: '1rem' }}>&lsaquo; Back to browsing</Link>
           <h1>{pet.name}</h1>
           <span className={styles.breed}>{pet.breed || pet.species} &bull; {pet.gender}</span>
        </div>

        <div className={styles.statsGrid}>
           <div className={styles.statItem}>
             <span className={styles.label}>Age</span>
             <span className={styles.value}>{pet.age} {pet.age === 1 ? 'Year' : 'Years'}</span>
           </div>
           <div className={styles.statItem}>
             <span className={styles.label}>Species</span>
             <span className={styles.value}>{pet.species}</span>
           </div>
           <div className={styles.statItem}>
             <span className={styles.label}>Status</span>
             <Badge variant={pet.status === 'available' ? 'success' : pet.status === 'pending' ? 'warning' : 'info'}>
               {pet.status}
             </Badge>
           </div>
        </div>

        <div className={styles.description}>
           <h3>About {pet.name}</h3>
           <p>{pet.description || "No description provided for this lovely pet. But don't let that stop you - reach out to learn more!"}</p>
        </div>

        <div className={styles.actions}>
           {!isAuthenticated ? (
             <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '1rem', color: '#64748b' }}>Interested in adopting {pet.name}?</p>
                <Link to="/login"><Button variant="primary" fullWidth>Log in to Apply</Button></Link>
             </div>
           ) : user?.role === 'admin' ? (
             <div style={{ textAlign: 'center' }}>
                <p>You are logged in as Admin. Manage this pet in the dashboard.</p>
                <Link to="/admin"><Button variant="secondary" fullWidth>Go to Admin Panel</Button></Link>
             </div>
           ) : alreadyApplied ? (
             <div style={{ textAlign: 'center' }}>
                <Badge variant="info" style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}>
                  You have already applied for this pet! 🐾
                </Badge>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>Check your dashboard for status updates.</p>
             </div>
           ) : (
             <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '1rem', color: '#475569', fontWeight: 500 }}>Ready to give {pet.name} a forever home?</p>
                <Button 
                   variant="primary" 
                   fullWidth 
                   onClick={() => mutation.mutate()} 
                   disabled={mutation.isPending || pet.status !== 'available'}
                >
                  {mutation.isPending ? 'Submitting...' : pet.status !== 'available' ? 'Not Available' : 'Apply for Adoption'}
                </Button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;
