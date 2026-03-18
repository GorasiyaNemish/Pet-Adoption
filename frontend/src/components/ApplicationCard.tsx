import React from 'react';
import type { AdoptionApplication, Pet } from '../types';
import Badge, { BadgeVariant } from './Badge';
import styles from './ApplicationCard.module.scss';

interface ApplicationCardProps {
  application: AdoptionApplication;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const pet = application.pet as Pet;
  const date = new Date(application.createdAt).toLocaleDateString();

  const getStatusVariant = (status: string): BadgeVariant => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className={styles.cardWrapper}>
      {pet.photoUrl ? (
        <img src={pet.photoUrl} alt={pet.name} className={styles.petImage} />
      ) : (
        <div className={styles.petPlaceholder}>🐾</div>
      )}

      <div className={styles.infoSection}>
        <div className={styles.header}>
          <div>
             <h3>{pet.name}</h3>
             <span className={styles.breed}>{pet.species} &bull; {pet.breed || 'Mixed'}</span>
          </div>
          <Badge variant={getStatusVariant(application.status)}>{application.status}</Badge>
        </div>
        
        <span className={styles.date}>Applied on {date}</span>
        
        {application.message && (
          <div className={styles.message}>
             <strong>Your Message:</strong><br />
             {application.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
