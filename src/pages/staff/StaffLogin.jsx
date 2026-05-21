import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "../../utils/validators";
import { getStaffSession, setStaffSession } from "../../utils/storage";
import staffUser from "../../data/staff";
import Button from "../../components/common/Button";

const StaffLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getStaffSession()) {
      navigate("/staff/dashboard", { replace: true });
    }
  }, [navigate]);

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
    const isValid =
      email === staffUser.email.toLowerCase() &&
      data.password === staffUser.password;

    if (!isValid) {
      toast.error("Invalid staff email or password.");
      return;
    }

    setStaffSession({
      email: staffUser.email,
      role: staffUser.role,
      loggedInAt: new Date().toISOString(),
    });

    toast.success("Welcome to the staff portal.");
    navigate("/staff/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-green-600">
            ZOOMANIA
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Staff Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to manage the zoo</p>
        </div>

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
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" className="w-full py-3">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link to="/" className="text-green-600 hover:underline">
            Back to public site
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;
