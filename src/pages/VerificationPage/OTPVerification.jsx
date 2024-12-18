import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "antd";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

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
  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      navigate("/reset-password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 py-6 px-6 flex flex-col items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/906b/c7ba/0245aec5f7480e8e14edaade481def72?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KX9gp~eDZdSer31mhl67upYuJcPaeY5FcyEIwPt5c7Hun21-KryDV4PBvZtMSXvPIh~vMMFOKdmzWwcfkYomEl~y2Re2eHv~eH4GjFEHJjFov9Vexquzos0RqfCBxpbthnvfGAY5mMtWheDzA9gLwrs0AhyNLFG8NdeqwRIQNPdcaqblsyF8j48b~U1DX2bHcpV8gIiL6LlFZfP4vS4ZdeIvHPK9pTGyuOzU-V4FCsOERSN1QiiHuAIPGowgo3lCTFuNMsgaOSeE-NSeoYf4l8ZVXo3dIxw1TRgb9GKNYD2EtIzkIesRahb5TSCNZLUV8nmzCys6CD~GqLuj2DCSfg__"
            alt="Logo"
            className="h-14 w-auto mb-5"
          />
          <h2 className="text-2xl font-bold text-white mb-1">
            Enter Verification Code
          </h2>
          <p className="text-white text-xs">Enter the OTP sent to your email</p>
        </div>

        {/* OTP Input Section */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Enter Verification Code
          </h3>
          <Form onFinish={handleSubmit}>
            {/* OTP Input Boxes */}
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

            {/* Resend OTP */}
            <div className="text-sm text-gray-600 text-center mb-4">
              Didn’t receive the code?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Resend OTP
              </a>
            </div>

            {/* Submit Button */}
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full py-2 text-sm font-semibold bg-blue-500 rounded-md hover:bg-blue-600"
              >
                FOLLOWING
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
