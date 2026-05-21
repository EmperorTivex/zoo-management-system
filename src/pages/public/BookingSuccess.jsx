import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getBookingById } from "../../utils/storage";
import { formatCurrency, formatDate } from "../../utils/helpers";
import QRCodeDisplay from "../../components/booking/QRCodeDisplay";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { CheckCircle, Printer, Download, ArrowRight, Home } from "lucide-react";

const BookingSuccess = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getBookingById(id);
    setBooking(data);
    setLoading(false);
  }, [id]);

  if (loading) return null;

  if (!booking) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">Booking Confirmed!</h1>
        <p className="mt-2 text-xl text-gray-500">Thank you for your order, {booking.fullName.split(' ')[0]}.</p>
      </div>

      <Card className="overflow-hidden border-2 border-green-50">
        <div className="bg-green-600 p-6 text-white text-center">
          <p className="text-sm uppercase tracking-widest font-bold opacity-80">Booking Reference</p>
          <h2 className="text-3xl font-mono font-black">{booking.id}</h2>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: QR Code & Details */}
          <div className="flex flex-col items-center justify-center space-y-4 border-r border-gray-100 pr-8">
            <QRCodeDisplay value={booking.id} size={180} />
            <p className="text-xs text-gray-400 text-center px-4 italic">
              Present this QR code at the entrance for quick entry.
            </p>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Visit Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-bold text-gray-900">{formatDate(booking.visitDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-bold text-green-600">{booking.status}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Tickets</h3>
              <div className="space-y-1">
                {Object.entries(booking.tickets).map(([type, count]) => {
                  if (count === 0) return null;
                  return (
                    <div key={type} className="flex justify-between text-sm">
                      <span className="text-gray-600 capitalize">{type} x {count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
              <span className="text-gray-900 font-bold">Total Paid</span>
              <span className="text-2xl font-black text-green-600">{formatCurrency(booking.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex flex-wrap gap-4 justify-center border-t border-gray-100">
          <Button variant="outline" className="flex items-center text-sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            Print Ticket
          </Button>
          <Button variant="outline" className="flex items-center text-sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </Card>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/">
          <Button variant="secondary" className="flex items-center px-8">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <Link to="/profile">
          <Button className="flex items-center px-8">
            View My Bookings
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccess;
