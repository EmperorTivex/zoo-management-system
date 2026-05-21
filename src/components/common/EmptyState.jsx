import React from 'react';

const EmptyState = ({ message = "No items found.", className = "" }) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;
