import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../utils/validators";
import { saveCheckoutDraft, getCheckoutDraft } from "../../utils/storage";
import ticketsData from "../../data/tickets";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import {
  Calendar,
  User,
  Mail,
  Ticket,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";

const BookTickets = () => {
  const navigate = useNavigate();
  const draft = getCheckoutDraft();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: draft?.fullName || "",
      email: draft?.email || "",
      visitDate: draft?.visitDate || "",
      tickets:
        draft?.tickets ||
        ticketsData.reduce((acc, t) => ({ ...acc, [t.id]: 0 }), {}),
    },
  });

  const getTicketCount = (id) => Number(watch(`tickets.${id}`)) || 0;

  const total = ticketsData.reduce(
    (sum, ticket) => sum + getTicketCount(ticket.id) * ticket.price,
    0,
  );

  const handleTicketChange = (id, delta) => {
    const currentCount = getTicketCount(id);
    const newCount = Math.max(0, currentCount + delta);
    setValue(`tickets.${id}`, newCount, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data) => {
    // Transform tickets from record to array for the checkout draft
    const ticketsArray = ticketsData
      .map((ticket) => ({
        ...ticket,
        quantity: data.tickets[ticket.id] || 0,
      }))
      .filter((ticket) => ticket.quantity > 0);

    saveCheckoutDraft({
      fullName: data.fullName,
      visitorName: data.fullName,
      email: data.email,
      visitDate: data.visitDate,
      tickets: ticketsArray,
      totalAmount: total,
    });
    navigate("/payment");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Book Your Adventure
        </h1>
        <p className="mt-2 text-gray-600">
          Select your date and tickets to visit Zoomania.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Left: Form Info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Visitor Information
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register("fullName")}
                    id="fullName"
                    type="text"
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="visitDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Visit Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register("visitDate")}
                    id="visitDate"
                    type="date"
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                {errors.visitDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.visitDate.message}
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Ticket className="w-5 h-5 mr-2 text-green-600" />
              Select Tickets
            </h2>
            <div className="divide-y divide-gray-100">
              {ticketsData.map((ticket) => (
                <div
                  key={ticket.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-gray-900">{ticket.name}</h3>
                    <p className="text-sm text-gray-500">
                      {ticket.description} ({ticket.ageRange})
                    </p>
                    <p className="text-green-600 font-medium">
                      {formatCurrency(ticket.price)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handleTicketChange(ticket.id, -1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">
                      {getTicketCount(ticket.id)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleTicketChange(ticket.id, 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {errors.tickets && (
              <p className="mt-4 text-sm text-red-600 text-center">
                {errors.tickets.message}
              </p>
            )}
          </Card>
        </div>

        {/* Right: Summary */}
        <div className="md:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {ticketsData.map((ticket) => {
                const count = getTicketCount(ticket.id);
                if (count === 0) return null;
                return (
                  <div
                    key={ticket.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {ticket.name} x {count}
                    </span>
                    <span>{formatCurrency(ticket.price * count)}</span>
                  </div>
                );
              })}
              <div className="pt-4 border-t border-gray-100 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span className="text-green-600">{formatCurrency(total)}</span>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center py-3"
              disabled={total === 0}
            >
              Proceed to Payment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <p className="mt-4 text-xs text-center text-gray-400 italic">
              * Payment is secure and encrypted.
            </p>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default BookTickets;
