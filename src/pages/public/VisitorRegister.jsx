import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { registerSchema } from "../../utils/validators";
import { addVisitor, getVisitorByEmail } from "../../utils/storage";
import Button from "../../components/common/Button";

const VisitorRegister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    if (getVisitorByEmail(data.email)) {
      toast.error("An account with this email already exists.");
      return;
    }

    const { confirmPassword: _, ...rest } = data;
    addVisitor({
      id: crypto.randomUUID(),
      fullName: rest.fullName,
      email: rest.email.trim().toLowerCase(),
      phone: rest.phone,
      password: rest.password,
      createdAt: new Date().toISOString(),
    });

    toast.success("Account created! Please log in.");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
      <p className="text-gray-600 mb-8">
        Already have an account?{" "}
        <Link to="/login" className="text-green-600 hover:underline font-medium">
          Log in
        </Link>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-md rounded-lg border border-gray-100 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" variant="primary" className="w-full py-3">
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default VisitorRegister;
