import React, { useState, useEffect } from 'react';
import type { Pet } from '../../types';
import Button from '../Button';
import Input from '../Input';
import styles from '../admin/Admin.module.scss';

interface PetFormProps {
  initialData?: Pet;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const PetForm: React.FC<PetFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: 0,
    gender: 'unknown',
    description: '',
    photoUrl: '',
    status: 'available'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        species: initialData.species,
        breed: initialData.breed || '',
        age: initialData.age,
        gender: initialData.gender,
        description: initialData.description || '',
        photoUrl: initialData.photoUrl || '',
        status: initialData.status
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '1.5rem' }}>{initialData ? 'Edit Pet' : 'Add New Pet'} 🐾</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Species</label>
          <select name="species" value={formData.species} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input label="Breed" name="breed" value={formData.breed} onChange={handleChange} placeholder="e.g. Golden Retriever" />
        <Input label="Age (Years)" name="age" type="number" value={formData.age} onChange={handleChange} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
         <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>
      </div>

      <Input label="Photo URL" name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="https://example.com/pet.jpg" />
      
      <Input label="Description" name="description" value={formData.description} onChange={handleChange} isTextArea />

      <div className={styles.actions} style={{ marginTop: '1.5rem' }}>
        <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Pet'}</Button>
      </div>
    </form>
  );
};

export default PetForm;
