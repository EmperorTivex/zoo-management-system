import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PawPrint, Ticket, DollarSign, Users } from "lucide-react";
import { getAnimals, getBookings, getVisitors } from "../../utils/storage";
import { formatCurrency, formatDate } from "../../utils/helpers";
import Badge from "../../components/common/Badge";

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  const stats = useMemo(() => {
    const animals = getAnimals();
    const bookings = getBookings();
    const visitors = getVisitors();

    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === "Paid")
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const confirmedVisitors = new Set(
      bookings
        .filter((b) => b.status === "Confirmed")
        .map((b) => b.email?.toLowerCase())
        .filter(Boolean),
    ).size;

    const latestBookings = [...bookings]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      )
      .slice(0, 5);

    return {
      totalAnimals: animals.length,
      totalBookings: bookings.length,
      totalRevenue,
      confirmedVisitors: confirmedVisitors || visitors.length,
      latestBookings,
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Total Animals"
          value={stats.totalAnimals}
          icon={PawPrint}
          color="bg-green-600"
        />
        <StatCard
          label="Total Bookings"
          value={stats.totalBookings}
          icon={Ticket}
          color="bg-blue-600"
        />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          color="bg-amber-600"
        />
        <StatCard
          label="Confirmed Visitors"
          value={stats.confirmedVisitors}
          icon={Users}
          color="bg-purple-600"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Latest Bookings</h3>
          <Link
            to="/staff/bookings"
            className="text-sm text-green-600 hover:underline font-medium"
          >
            View all
          </Link>
        </div>

        {stats.latestBookings.length === 0 ? (
          <p className="px-6 py-8 text-gray-500 text-center">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Reference</th>
                  <th className="px-6 py-3">Visitor</th>
                  <th className="px-6 py-3">Visit Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.latestBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {booking.reference}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {booking.visitorName}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {formatDate(booking.visitDate)}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {formatCurrency(booking.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          booking.status === "Confirmed"
                            ? "success"
                            : booking.status === "Cancelled"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
