import React from 'react';
import { Link } from 'react-router-dom';
import type { Pet } from '../types';
import Card from './Card';
import Badge, { BadgeVariant } from './Badge';
import Button from './Button';
import styles from './PetCard.module.scss';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const getStatusVariant = (status: string): BadgeVariant => {
    switch (status) {
      case 'available': return 'success';
      case 'pending': return 'warning';
      case 'adopted': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <Link to={`/pets/${pet._id}`} className={styles.cardWrapper}>
      <Card noPadding className={styles.fullHeight}>
        <div className={styles.imageOuter}>
          {pet.photoUrl ? (
            <img src={pet.photoUrl} alt={pet.name} className={styles.image} />
          ) : (
            <div className={styles.placeholder}>🐾</div>
          )}
          <Badge variant={getStatusVariant(pet.status)} className={styles.badge}>
            {pet.status}
          </Badge>
        </div>
        <div style={{ padding: '1.25rem' }}>
          <div className={styles.info}>
            <h3 className={styles.petName}>{pet.name}</h3>
            <span className={styles.breed}>{pet.breed || pet.species}</span>
          </div>
          <div className={styles.details}>
            <span className={styles.detailItem}>
              <strong>Age:</strong> {pet.age} {pet.age === 1 ? 'Year' : 'Years'}
            </span>
            <span className={styles.detailItem}>
              <strong>Sex:</strong> {pet.gender}
            </span>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
             <Button variant="secondary" size="sm" fullWidth>View Details</Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PetCard;
