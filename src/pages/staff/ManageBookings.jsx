import { useState, useMemo } from "react";
import { toast } from "sonner";
import { getBookings, updateBooking } from "../../utils/storage";
import { formatCurrency, formatDate } from "../../utils/helpers";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

const STATUS_FILTERS = ["All", "Confirmed", "Cancelled", "Checked In"];

const getStatusVariant = (booking) => {
  if (booking.status === "Cancelled") return "danger";
  if (booking.checkedIn) return "info";
  if (booking.status === "Confirmed") return "success";
  return "warning";
};

const getDisplayStatus = (booking) => {
  if (booking.status === "Cancelled") return "Cancelled";
  if (booking.checkedIn) return "Checked In";
  return booking.status;
};

const ManageBookings = () => {
  const [bookings, setBookings] = useState(() => getBookings());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const refreshBookings = () => setBookings(getBookings());

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((b) => {
      const matchesSearch =
        !query ||
        b.reference?.toLowerCase().includes(query) ||
        b.visitorName?.toLowerCase().includes(query) ||
        b.email?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Checked In" && b.checkedIn) ||
        (statusFilter === "Confirmed" &&
          b.status === "Confirmed" &&
          !b.checkedIn) ||
        (statusFilter === "Cancelled" && b.status === "Cancelled");

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const handleCancel = (booking) => {
    if (booking.status === "Cancelled") return;

    if (!window.confirm(`Cancel booking ${booking.reference}?`)) return;

    updateBooking(booking.id, { status: "Cancelled" });
    refreshBookings();
    toast.success("Booking cancelled.");
  };

  const handleCheckIn = (booking) => {
    if (booking.checkedIn) return;

    updateBooking(booking.id, { checkedIn: true });
    refreshBookings();
    toast.success(`${booking.visitorName} checked in successfully.`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Bookings</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by reference, name, or email..."
          className="flex-1 max-w-lg"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {STATUS_FILTERS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Reference</th>
              <th className="px-6 py-3">Visitor</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Visit Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {booking.reference}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {booking.visitorName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{booking.email}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatDate(booking.visitDate)}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {formatCurrency(booking.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusVariant(booking)}>
                      {getDisplayStatus(booking)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <Button
                      variant="outline"
                      className="text-xs py-1 px-2"
                      disabled={booking.checkedIn || booking.status === "Cancelled"}
                      onClick={() => handleCheckIn(booking)}
                    >
                      Check In
                    </Button>
                    <Button
                      variant="danger"
                      className="text-xs py-1 px-2"
                      disabled={booking.status === "Cancelled"}
                      onClick={() => handleCancel(booking)}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
