import React from 'react';
import { formatCurrency } from '../../utils/helpers';

const TicketTypeCard = ({ ticket, quantity, onQuantityChange }) => {
  const subtotal = ticket.price * quantity;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{ticket.name}</h3>
          <p className="text-sm text-gray-500">{ticket.ageRange}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">{formatCurrency(ticket.price)}</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{ticket.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => onQuantityChange(ticket.id, Math.max(0, quantity - 1))}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl flex items-center justify-center transition-colors"
          >
            -
          </button>
          <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(ticket.id, quantity + 1)}
            className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>

        {quantity > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(subtotal)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketTypeCard;
