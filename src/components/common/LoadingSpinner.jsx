import React from 'react';

const LoadingSpinner = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center py-12 ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );
};

export default LoadingSpinner;
