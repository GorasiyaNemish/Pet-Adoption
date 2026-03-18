import React from 'react';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  search: string;
  onSearchChange: (val: string) => void;
  species: string;
  onSpeciesChange: (val: string) => void;
  age: string;
  onAgeChange: (val: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  search,
  onSearchChange,
  species,
  onSpeciesChange,
  age,
  onAgeChange,
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.searchWrapper}>
        <span className={styles.icon}>🔍</span>
        <input 
          type="text" 
          placeholder="Search pets by name or breed..." 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Species</label>
        <select 
          className={styles.select}
          value={species}
          onChange={(e) => onSpeciesChange(e.target.value)}
        >
          <option value="">All Species</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Bird">Birds</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Age Range</label>
        <select 
          className={styles.select}
          value={age}
          onChange={(e) => onAgeChange(e.target.value)}
        >
          <option value="">Any Age</option>
          <option value="young">Young (0-2 years)</option>
          <option value="adult">Adult (3-8 years)</option>
          <option value="senior">Senior (9+ years)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
