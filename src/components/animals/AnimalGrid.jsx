import React from 'react';
import AnimalCard from './AnimalCard';
import EmptyState from '../common/EmptyState';

const AnimalGrid = ({ animals }) => {
  if (animals.length === 0) {
    return <EmptyState message="No animals match your criteria." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
};

export default AnimalGrid;
