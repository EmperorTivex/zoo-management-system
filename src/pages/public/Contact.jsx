import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema } from "../../utils/validators";
import Button from "../../components/common/Button";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = () => {
    toast.success("Message sent! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-600 mb-4">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Address</h3>
              <p className="text-gray-600">123 Wild Way, Nature City, NC 12345</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">info@zoomania.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 shadow-md rounded-lg border border-gray-100"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Your Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="Your Message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
