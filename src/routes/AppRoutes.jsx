import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Animals from "../pages/public/Animals";
import AnimalDetails from "../pages/public/AnimalDetails";
import BookTickets from "../pages/public/BookTickets";
import Payment from "../pages/public/Payment";
import BookingSuccess from "../pages/public/BookingSuccess";
import VisitorLogin from "../pages/public/VisitorLogin";
import VisitorRegister from "../pages/public/VisitorRegister";
import Profile from "../pages/public/Profile";
import NotFound from "../pages/public/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import StaffProtectedRoute from "./StaffProtectedRoute";

// Staff Pages
import StaffLogin from "../pages/staff/StaffLogin";
import DashboardHome from "../pages/staff/DashboardHome";
import ManageAnimals from "../pages/staff/ManageAnimals";
import ManageBookings from "../pages/staff/ManageBookings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/animals/:id" element={<AnimalDetails />} />
        <Route path="/book-tickets" element={<BookTickets />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-success/:id" element={<BookingSuccess />} />
        <Route path="/login" element={<VisitorLogin />} />
        <Route path="/register" element={<VisitorRegister />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Staff Routes */}
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route element={<StaffProtectedRoute />}>
        <Route path="/staff" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="animals" element={<ManageAnimals />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
