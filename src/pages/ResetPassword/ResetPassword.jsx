import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { usePostMutation } from "../../services/apiService"; // Import the API service
import logo from "../../assets/alvorelogo.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get phone number from state
  const phoneNumber = state?.phone; // Access the phone number

  const [resetPassword, { isLoading }] = usePostMutation(); // Hook for password reset API

  // Handle form submission
  const onFinish = async (values) => {
    if (!phoneNumber) {
      message.error("Phone number is required. Please go back and re-enter.");
      return;
    }

    try {
      const response = await resetPassword({
        path: "/auth/forgot-password/reset", // API endpoint
        body: { phone: phoneNumber, newPassword: values.newPassword },
        credentials: "include", // Ensure session cookie is sent
      }).unwrap();

      // Handle success
      console.log("API Response:", response);
      message.success("Password reset successfully!");
      navigate("/login"); // Navigate to login page after password reset
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      message.error(
        error?.data?.message || "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 py-6 px-6 flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-14 w-auto mb-2" />
          <h2 className="text-2xl font-bold text-white mb-1">
            Reset Your Password
          </h2>
          <p className="text-white text-xs">Enter your new password below</p>
        </div>

        {/* Reset Password Form */}
        <div className="px-6 py-6">
          <Form
            name="resetPasswordForm"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* New Password Field */}
            <Form.Item
              label={
                <span className="text-sm text-gray-700">New Password</span>
              }
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter new password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            {/* Confirm Password Field */}
            <Form.Item
              label={
                <span className="text-sm text-gray-700">Confirm Password</span>
              }
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading} // Show loading spinner during API call
                className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
