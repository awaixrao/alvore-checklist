import { useState } from "react"; // Correct import for useState
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { usePostMutation } from "../../services/apiService";
import logo from "../../assets/alvorelogo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sendOtp, { isLoading }] = usePostMutation();
  const [phoneNumber, setPhoneNumber] = useState(""); // Store the phone number here

  // Handle form submission
  const onFinish = async (values) => {
    try {
      // Your API call or any other logic that might throw an error
      const response = await sendOtp({
        path: "auth/forgot-password/send-otp",
        body: values,
      }).unwrap();

      // Handle success
      message.success(response.message || "OTP sent successfully!");
      navigate("/verification", { state: { phone: values.phone } }); // Passing phone number to the verification page
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error:", error);
      message.error(
        error?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-500 py-8 px-6 flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
          <p className="text-white text-sm mt-2">
            Enter your phone number to reset your password
          </p>
        </div>

        <div className="px-6 py-8 mt-8">
          <Form
            form={form}
            name="forgotPassword"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="phone"
              label={
                <label className="text-sm text-gray-700">Phone Number:</label>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  pattern: /^\+?[1-9]\d{1,14}$/,
                  message:
                    "Please enter a valid phone number with country code!",
                },
              ]}
            >
              <Input
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full py-2 mt-8 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                SEND OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
