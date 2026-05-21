import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "../../utils/validators";
import {
  getCheckoutDraft,
  addBooking,
  clearCheckoutDraft,
} from "../../utils/storage";
import { formatCurrency, generateBookingReference } from "../../utils/helpers";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import {
  CreditCard,
  Calendar,
  Lock,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const draft = getCheckoutDraft();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  if (!draft) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          No checkout draft found
        </h2>
        <Button onClick={() => navigate("/book-tickets")} className="mt-4">
          Go to Booking
        </Button>
      </div>
    );
  }

  const onSubmit = (data) => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const bookingId = generateBookingReference();
      const newBooking = {
        id: bookingId,
        ...draft,
        paymentInfo: {
          last4: data.cardNumber.slice(-4),
          method: "Card",
        },
        status: "Confirmed",
        createdAt: new Date().toISOString(),
      };

      addBooking(newBooking);
      clearCheckoutDraft();
      setIsProcessing(false);
      navigate(`/booking-success/${bookingId}`);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button
        variant="secondary"
        onClick={() => navigate("/book-tickets")}
        className="mb-8 flex items-center text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Selection
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Payment Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-green-600" />
              Payment Information
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register("cardNumber")}
                    type="text"
                    maxLength="16"
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="1234 5678 1234 5678"
                  />
                </div>
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register("expiryDate")}
                      type="text"
                      placeholder="MM/YY"
                      maxLength="5"
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.expiryDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register("cvv")}
                      type="text"
                      placeholder="123"
                      maxLength="4"
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cvv.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full py-3 text-lg flex items-center justify-center"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatCurrency(draft.total)}`
                  )}
                </Button>
              </div>
            </form>
          </Card>

          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center text-xs">
              <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
              Secure Payment
            </div>
            <div className="flex items-center text-xs">
              <Lock className="w-4 h-4 mr-1 text-green-500" />
              SSL Encrypted
            </div>
          </div>
        </div>

        {/* Right: Booking Summary */}
        <div className="md:col-span-1">
          <Card className="p-6 bg-gray-50 border-none">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name</span>
                <span className="font-medium">{draft.fullName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{draft.visitDate}</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                {Object.entries(draft.tickets).map(([id, count]) => {
                  if (count === 0) return null;
                  return (
                    <div key={id} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 capitalize">
                        {id} Ticket x {count}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="text-green-600">
                  {formatCurrency(draft.total)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
