import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "../../utils/validators";
import { getVisitors, setCurrentUser } from "../../utils/storage";
import Button from "../../components/common/Button";

const VisitorLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    const email = data.email.trim().toLowerCase();
    const user = getVisitors().find(
      (v) =>
        v.email.toLowerCase() === email && v.password === data.password,
    );

    if (!user) {
      toast.error("Invalid email or password.");
      return;
    }

    const { password: _, ...sessionUser } = user;
    setCurrentUser(sessionUser);
    toast.success(`Welcome back, ${user.fullName}!`);
    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Visitor Login</h1>
      <p className="text-gray-600 mb-8">
        New here?{" "}
        <Link
          to="/register"
          className="text-green-600 hover:underline font-medium"
        >
          Create an account
        </Link>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-md rounded-lg border border-gray-100 space-y-4"
      >
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

        <Button type="submit" variant="primary" className="w-full py-3">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default VisitorLogin;
