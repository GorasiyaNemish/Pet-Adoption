import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchAllAdoptions, updateAdoptionStatus } from '../../api/adoptionApi';
import type { AdoptionApplication, Pet, User } from '../../types';
import Button from '../Button';
import Badge from '../Badge';
import Spinner from '../Spinner';
import styles from './Admin.module.scss';

const AdminAdoptionsPage: React.FC = () => {
  const queryClient = useQueryClient();

  // 1. Fetch All Adoptions
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-adoptions'],
    queryFn: fetchAllAdoptions
  });

  // 2. Status Mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => updateAdoptionStatus(id, status),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(`Application ${response.data.status} successfully! 🐾`);
        queryClient.invalidateQueries({ queryKey: ['admin-adoptions'] });
        queryClient.invalidateQueries({ queryKey: ['admin-pets'] }); // Pet status might have changed to 'adopted'
        queryClient.invalidateQueries({ queryKey: ['pets'] });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update application status.';
      toast.error(message);
    }
  });

  const handleStatusUpdate = (id: string, status: string) => {
    const confirmMsg = `Are you sure you want to ${status} this application?`;
    if (window.confirm(confirmMsg)) {
      statusMutation.mutate({ id, status });
    }
  };

  const adoptions = data?.data || [];

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '150px' }}><Spinner size="lg" /></div>;

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Adoption Applications 📋</h1>
          <p style={{ color: '#64748b' }}>Review and manage adoption requests from users.</p>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pet</th>
              <th>Applicant</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '50px' }}>No adoption applications found.</td>
              </tr>
            ) : (
              adoptions.map((app) => {
                const pet = app.pet as Pet;
                const applicant = app.applicant as User;
                return (
                  <tr key={app._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <strong>{pet?.name || 'Deleted Pet'}</strong>
                         <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({pet?.species})</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>{applicant?.name || 'Unknown'}</strong><br />
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{applicant?.email}</span>
                      </div>
                    </td>
                    <td>
                       <Badge variant={app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'error' : 'warning'}>
                         {app.status}
                       </Badge>
                    </td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actions}>
                        {app.status === 'pending' && (
                          <>
                            <Button 
                              variant="primary" 
                              size="sm" 
                              onClick={() => handleStatusUpdate(app._id, 'approved')}
                              disabled={statusMutation.isPending}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm" 
                              onClick={() => handleStatusUpdate(app._id, 'rejected')}
                              disabled={statusMutation.isPending}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {app.status !== 'pending' && <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Processed</span>}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAdoptionsPage;
