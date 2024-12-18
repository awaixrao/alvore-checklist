import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/verification"); // Navigate to OTP page on success
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 py-8 px-6 flex flex-col items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/906b/c7ba/0245aec5f7480e8e14edaade481def72?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KX9gp~eDZdSer31mhl67upYuJcPaeY5FcyEIwPt5c7Hun21-KryDV4PBvZtMSXvPIh~vMMFOKdmzWwcfkYomEl~y2Re2eHv~eH4GjFEHJjFov9Vexquzos0RqfCBxpbthnvfGAY5mMtWheDzA9gLwrs0AhyNLFG8NdeqwRIQNPdcaqblsyF8j48b~U1DX2bHcpV8gIiL6LlFZfP4vS4ZdeIvHPK9pTGyuOzU-V4FCsOERSN1QiiHuAIPGowgo3lCTFuNMsgaOSeE-NSeoYf4l8ZVXo3dIxw1TRgb9GKNYD2EtIzkIesRahb5TSCNZLUV8nmzCys6CD~GqLuj2DCSfg__"
            alt="Logo"
            className="h-16 w-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
          <p className="text-white text-sm mt-2">
            Enter your email to reset your password
          </p>
        </div>

        {/* Input Section */}
        <div className="px-6 py-8 mt-8  ">
          <Form
            form={form}
            name="forgotPassword"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            {/* Email Field */}
            <Form.Item
              name="email"
              label={<label className="text-sm  text-gray-700">Email</label>}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="w-full px-4  py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full py-2 mt-8 text-white bg-blue-500 rounded-md hover:bg-blue-600"
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

export default ForgotPassword;
