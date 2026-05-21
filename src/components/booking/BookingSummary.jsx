import React from 'react';
import { formatCurrency, formatDate } from '../../utils/helpers';

const BookingSummary = ({ visitDate, tickets, totalAmount }) => {
  const selectedTickets = tickets.filter(ticket => ticket.quantity > 0);

  if (selectedTickets.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Visit Date:</span>
          <span className="font-medium text-gray-900">{formatDate(visitDate)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Tickets:</p>
          {selectedTickets.map(ticket => (
            <div key={ticket.id} className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">
                {ticket.name} x{ticket.quantity}
              </span>
              <span className="font-medium text-gray-900">
                {formatCurrency(ticket.price * ticket.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total Amount:</span>
          <span className="text-2xl font-bold text-green-600">{formatCurrency(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
