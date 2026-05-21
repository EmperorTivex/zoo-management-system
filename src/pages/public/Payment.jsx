import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema } from '../../utils/validators';
import { toast } from 'sonner';
import {
  getCheckoutDraft,
  clearCheckoutDraft,
  addBooking,
  getCurrentUser,
} from '../../utils/storage';
import { formatCurrency, formatDate, generateBookingReference } from '../../utils/helpers';
import Button from '../../components/common/Button';

const Payment = () => {
  const navigate = useNavigate();
  const [checkoutDraft, setCheckoutDraft] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const draft = getCheckoutDraft();
    if (!draft) {
      navigate('/book-tickets');
      return;
    }
    setCheckoutDraft(draft);
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const onSubmit = async (data) => {
    if (!checkoutDraft) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const currentUser = getCurrentUser();

    const booking = {
      id: crypto.randomUUID(),
      reference: generateBookingReference(),
      visitorName: checkoutDraft.visitorName,
      email: currentUser?.email ?? checkoutDraft.email,
      phone: checkoutDraft.phone,
      visitDate: checkoutDraft.visitDate,
      tickets: checkoutDraft.tickets,
      totalAmount: checkoutDraft.totalAmount,
      status: 'Confirmed',
      paymentStatus: 'Paid',
      createdAt: new Date().toISOString(),
      checkedIn: false,
      userId: currentUser?.id ?? null,
    };

    addBooking(booking);
    clearCheckoutDraft();
    toast.success('Booking saved successfully!');

    navigate(`/booking-success/${booking.id}`);
  };

  if (!checkoutDraft) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
        <p className="mt-2 text-gray-600">Complete your booking payment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  {...register('cardholderName')}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  {...register('cardNumber')}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    {...register('expiryDate')}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    {...register('cvv')}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6 py-3 text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ${formatCurrency(checkoutDraft.totalAmount)}`}
            </Button>

            <p className="mt-4 text-xs text-center text-gray-400 italic">
              * This is a demo payment. No actual charges will be made.
            </p>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Visit Date:</span>
                <span className="font-medium text-gray-900">{formatDate(checkoutDraft.visitDate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Visitor:</span>
                <span className="font-medium text-gray-900">{checkoutDraft.visitorName}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Tickets:</p>
              {checkoutDraft.tickets.map(ticket => (
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

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-green-600">{formatCurrency(checkoutDraft.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
