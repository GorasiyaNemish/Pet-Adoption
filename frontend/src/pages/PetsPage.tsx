import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPets } from '../api/petApi';
import FilterPanel from '../components/FilterPanel';
import PetCard from '../components/PetCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';

const PetsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [page, setPage] = useState(1);

  // Map age dropdown to min/max age for API
  const getAgeParams = () => {
    switch (age) {
      case 'young': return { minAge: 0, maxAge: 2 };
      case 'adult': return { minAge: 3, maxAge: 8 };
      case 'senior': return { minAge: 9 };
      default: return {};
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pets', { search, species, age, page }],
    queryFn: () => fetchPets({
      search,
      species,
      ...getAgeParams(),
      page,
      limit: 8
    }),
    placeholderData: (previousData) => previousData
  });

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1); // Reset to first page on search
  };

  const handleSpeciesChange = (val: string) => {
    setSpecies(val);
    setPage(1);
  };

  const handleAgeChange = (val: string) => {
    setAge(val);
    setPage(1);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Find Your New Best Friend 🐾</h1>
        <p style={{ color: '#64748b' }}>Browse through our adorable pets waiting for a forever home.</p>
      </div>

      <FilterPanel 
        search={search}
        onSearchChange={handleSearchChange}
        species={species}
        onSpeciesChange={handleSpeciesChange}
        age={age}
        onAgeChange={handleAgeChange}
      />

      {isLoading && page === 1 ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#ef4444' }}>
          <h3>Oops! Something went wrong while fetching pets.</h3>
          <p>Please try again later.</p>
        </div>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {data?.data.map(pet => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>

          {!isLoading && data?.data.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <h3>No pets found matching your criteria. 🐾</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}

          {data && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination 
                currentPage={data.meta.page}
                totalPages={data.meta.pages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PetsPage;
