import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getBookingById } from "../../utils/storage";
import { formatCurrency, formatDate } from "../../utils/helpers";
import QRCodeDisplay from "../../components/booking/QRCodeDisplay";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import {
  CheckCircle,
  Printer,
  ArrowRight,
  Home,
} from "lucide-react";

/** Supports tickets saved as an array (current) or legacy record shape. */
const getTicketLines = (tickets) => {
  if (!tickets) return [];

  if (Array.isArray(tickets)) {
    return tickets.filter((t) => (t.quantity ?? 0) > 0);
  }

  if (typeof tickets === "object") {
    return Object.entries(tickets)
      .filter(([, qty]) => Number(qty) > 0)
      .map(([id, quantity]) => ({
        id,
        name: id,
        quantity: Number(quantity),
        price: 0,
      }));
  }

  return [];
};

const BookingSuccess = () => {
  const { id } = useParams();

  const booking = useMemo(() => getBookingById(id), [id]);
  const ticketLines = useMemo(
    () => (booking ? getTicketLines(booking.tickets) : []),
    [booking],
  );

  if (!booking) {
    return <Navigate to="/404" replace />;
  }

  const visitorName = booking.visitorName || booking.fullName || "Guest";
  const firstName = visitorName.split(" ")[0];
  const reference = booking.reference || booking.id;
  const totalPaid = booking.totalAmount ?? booking.total ?? 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">
          Booking Confirmed!
        </h1>
        <p className="mt-2 text-xl text-gray-500">
          Thank you for your order, {firstName}.
        </p>
      </div>

      <Card className="overflow-hidden border-2 border-green-50">
        <div className="bg-green-600 p-6 text-white text-center">
          <p className="text-sm uppercase tracking-widest font-bold opacity-80">
            Booking Reference
          </p>
          <h2 className="text-3xl font-mono font-black">{reference}</h2>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center space-y-4 md:border-r md:border-gray-100 md:pr-8">
            <QRCodeDisplay value={reference} size={180} />
            <p className="text-xs text-gray-400 text-center px-4 italic">
              Present this QR code at the entrance for quick entry.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Visitor
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">Name</span>
                  <span className="font-bold text-gray-900 text-right">
                    {visitorName}
                  </span>
                </div>
                {booking.email && (
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium text-gray-900 text-right break-all">
                      {booking.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Visit Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-bold text-gray-900">
                    {formatDate(booking.visitDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="success">{booking.status}</Badge>
                </div>
                {booking.paymentStatus && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment</span>
                    <span className="font-medium text-gray-900">
                      {booking.paymentStatus}
                      {booking.paymentInfo?.last4
                        ? ` (•••• ${booking.paymentInfo.last4})`
                        : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Tickets
              </h3>
              <div className="space-y-2">
                {ticketLines.length === 0 ? (
                  <p className="text-sm text-gray-500">No ticket details.</p>
                ) : (
                  ticketLines.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {ticket.name} x {ticket.quantity}
                      </span>
                      {ticket.price > 0 && (
                        <span className="font-medium text-gray-900">
                          {formatCurrency(ticket.price * ticket.quantity)}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
              <span className="text-gray-900 font-bold">Total Paid</span>
              <span className="text-2xl font-black text-green-600">
                {formatCurrency(totalPaid)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex flex-wrap gap-4 justify-center border-t border-gray-100">
          <Button
            variant="outline"
            className="flex items-center text-sm"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Ticket
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
