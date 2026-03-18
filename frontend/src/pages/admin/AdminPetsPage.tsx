import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchPets, createPet, updatePet, deletePet } from '../../api/petApi';
import type { Pet } from '../../types';
import Button from '../Button';
import Badge from '../Badge';
import Spinner from '../Spinner';
import PetForm from './PetForm';
import styles from './Admin.module.scss';

const AdminPetsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | undefined>(undefined);
  const queryClient = useQueryClient();

  // 1. Fetch Pets (all pets)
  const { data, isLoading } = useQuery({
    queryKey: ['admin-pets'],
    queryFn: () => fetchPets({ limit: 100 }) // Load many for admin view
  });

  // 2. mutations
  const createMutation = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      toast.success('Pet added successfully! 🐾');
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['admin-pets'] });
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updatePet(id, data),
    onSuccess: () => {
      toast.success('Pet updated successfully! ✨');
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['admin-pets'] });
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePet,
    onSuccess: () => {
      toast.success('Pet deleted. 🗑️');
      queryClient.invalidateQueries({ queryKey: ['admin-pets'] });
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    }
  });

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this pet? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (formData: any) => {
    if (editingPet) {
      updateMutation.mutate({ id: editingPet._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPet(undefined);
  };

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '150px' }}><Spinner size="lg" /></div>;

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Pet Management 🐾</h1>
          <p style={{ color: '#64748b' }}>Add, edit, or remove pets from the system.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ Add New Pet</Button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pet</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((pet) => (
              <tr key={pet._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {pet.photoUrl ? (
                      <img src={pet.photoUrl} alt={pet.name} className={styles.petThumb} />
                    ) : (
                      <div className={styles.petThumb} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🐾</div>
                    )}
                    <strong>{pet.name}</strong>
                  </div>
                </td>
                <td>{pet.species}</td>
                <td>{pet.breed || '-'}</td>
                <td>{pet.age} {pet.age === 1 ? 'yr' : 'yrs'}</td>
                <td>
                   <Badge variant={pet.status === 'available' ? 'success' : pet.status === 'pending' ? 'warning' : 'info'}>
                     {pet.status}
                   </Badge>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Button variant="secondary" size="sm" onClick={() => handleEdit(pet)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(pet._id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <PetForm 
              initialData={editingPet} 
              onSubmit={handleSubmit} 
              onCancel={closeModal}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPetsPage;
