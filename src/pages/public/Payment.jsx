import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "../../utils/validators";
import { toast } from "sonner";
import {
  getCheckoutDraft,
  clearCheckoutDraft,
  addBooking,
  getCurrentUser,
} from "../../utils/storage";
import {
  formatCurrency,
  formatDate,
  generateBookingReference,
} from "../../utils/helpers";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import {
  CreditCard,
  Calendar,
  Lock,
  ShieldCheck,
  ArrowLeft,
  User,
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [checkoutDraft, setCheckoutDraft] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const draft = getCheckoutDraft();
    if (!draft) {
      navigate("/book-tickets");
      return;
    }
    setCheckoutDraft(draft);
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = async (data) => {
    if (!checkoutDraft) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const currentUser = getCurrentUser();

    const booking = {
      id: crypto.randomUUID(),
      reference: generateBookingReference(),
      visitorName: checkoutDraft.visitorName || checkoutDraft.fullName,
      email: currentUser?.email ?? checkoutDraft.email,
      visitDate: checkoutDraft.visitDate,
      tickets: checkoutDraft.tickets,
      totalAmount: checkoutDraft.totalAmount,
      paymentInfo: {
        last4: data.cardNumber.slice(-4),
        method: "Card",
      },
      status: "Confirmed",
      paymentStatus: "Paid",
      createdAt: new Date().toISOString(),
      checkedIn: false,
      userId: currentUser?.id ?? null,
    };

    addBooking(booking);
    clearCheckoutDraft();
    toast.success("Booking saved successfully!");

    navigate(`/booking-success/${booking.id}`);
  };

  if (!checkoutDraft) {
    return null;
  }

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
                  Cardholder Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register("cardholderName")}
                    type="text"
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="John Doe"
                  />
                </div>
                {errors.cardholderName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardholderName.message}
                  </p>
                )}
              </div>

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
                  disabled={isProcessing || !isValid}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatCurrency(checkoutDraft.totalAmount)}`
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
                <span className="font-medium">
                  {checkoutDraft.visitorName || checkoutDraft.fullName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">
                  {formatDate(checkoutDraft.visitDate)}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                {checkoutDraft.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex justify-between text-sm mb-1"
                  >
                    <span className="text-gray-500 capitalize">
                      {ticket.name} x {ticket.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(ticket.price * ticket.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="text-green-600">
                  {formatCurrency(checkoutDraft.totalAmount)}
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
