import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getBookings,
  clearCurrentUser,
} from "../../utils/storage";
import { formatCurrency, formatDate } from "../../utils/helpers";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

const getStatusVariant = (status) => {
  const normalized = (status || "").toLowerCase();
  if (normalized === "confirmed" || normalized === "paid") return "success";
  if (normalized === "pending") return "warning";
  if (normalized === "cancelled") return "danger";
  return "default";
};

const Profile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const userBookings = useMemo(() => {
    const bookings = getBookings();
    return bookings.filter(
      (b) =>
        b.userId === user?.id ||
        b.email?.toLowerCase() === user?.email?.toLowerCase(),
    );
  }, [user?.id, user?.email]);

  const totalPaid = useMemo(
    () =>
      userBookings
        .filter((b) => b.paymentStatus === "Paid")
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    [userBookings],
  );

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Account Details</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-500">Full Name</dt>
            <dd className="font-medium text-gray-900">{user?.fullName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Phone</dt>
            <dd className="font-medium text-gray-900">{user?.phone}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Member Since</dt>
            <dd className="font-medium text-gray-900">
              {user?.createdAt ? formatDate(user.createdAt) : "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-green-50 rounded-lg p-4 mb-8 border border-green-100">
        <p className="text-sm text-gray-600">Total Paid</p>
        <p className="text-2xl font-bold text-green-700">
          {formatCurrency(totalPaid)}
        </p>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Booking History</h2>

      {userBookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg mb-4">No bookings yet.</p>
          <Button variant="primary" onClick={() => navigate("/book-tickets")}>
            Book Tickets
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {userBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Reference</p>
                  <p className="font-bold text-gray-900">{booking.reference}</p>
                </div>
                <Badge variant={getStatusVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Visit Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(booking.visitDate)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Payment</p>
                  <p className="font-medium text-gray-900">
                    {booking.paymentStatus}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(booking.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
