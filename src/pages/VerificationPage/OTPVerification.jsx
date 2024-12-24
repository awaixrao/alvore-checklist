import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, message } from "antd";
import { usePostMutation } from "../../services/apiService"; // Import the API service
import logo from "../../assets/alvorelogo.png";

const OTPVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Access the state passed through navigate
  const phoneNumber = state?.phone; // Get the phone number from state

  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Support 6 digits OTP
  const inputRefs = Array.from({ length: 6 }, () => useRef());
  const [verifyOtp, { isLoading }] = usePostMutation(); // Hook for OTP verification API

  // Handle input change
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Limit input to one digit
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      if (!phoneNumber) {
        message.error("Phone number is required. Please go back and re-enter.");
        return;
      }

      try {
        const response = await verifyOtp({
          path: "/auth/forgot-password/verify-otp",
          body: { otp: otpValue, phone: phoneNumber },
          credentials: "include", // Ensure session cookie is sent
        }).unwrap();

        // Handle success
        console.log("API Response:", response);
        if (response?.data?.data?.valid) {
          message.success("OTP verified successfully!");
          navigate("/reset-password", { state: { phone: phoneNumber } });
        } else {
          message.error("Invalid OTP. Please try again.");
        }
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
        message.error(
          error?.data?.message || "Failed to verify OTP. Please try again."
        );
      }
    } else {
      message.error("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-500 py-6 px-6 flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-14 w-auto mb-5" />
          <h2 className="text-2xl font-bold text-white mb-1">
            Enter Verification Code
          </h2>
          <p className="text-white text-xs">
            Enter the OTP sent to your phone: {phoneNumber}
          </p>
        </div>

        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Enter Verification Code
          </h3>
          <Form onFinish={handleSubmit}>
            <div className="mb-8 text-center">
              <div className="flex justify-center space-x-4">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-600 text-center mb-4">
              Didn’t receive the code?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Resend OTP
              </a>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full py-2 text-sm font-semibold bg-blue-500 rounded-md hover:bg-blue-600"
              >
                VERIFY
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
