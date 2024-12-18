import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

const Register = () => {
  const navigate = useNavigate();

  // Handle form submission
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/dashboard"); // Navigate after successful registration
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 py-6 px-6 flex flex-col items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/906b/c7ba/0245aec5f7480e8e14edaade481def72?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KX9gp~eDZdSer31mhl67upYuJcPaeY5FcyEIwPt5c7Hun21-KryDV4PBvZtMSXvPIh~vMMFOKdmzWwcfkYomEl~y2Re2eHv~eH4GjFEHJjFov9Vexquzos0RqfCBxpbthnvfGAY5mMtWheDzA9gLwrs0AhyNLFG8NdeqwRIQNPdcaqblsyF8j48b~U1DX2bHcpV8gIiL6LlFZfP4vS4ZdeIvHPK9pTGyuOzU-V4FCsOERSN1QiiHuAIPGowgo3lCTFuNMsgaOSeE-NSeoYf4l8ZVXo3dIxw1TRgb9GKNYD2EtIzkIesRahb5TSCNZLUV8nmzCys6CD~GqLuj2DCSfg__"
            alt="Logo"
            className="h-14 w-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-white mb-1">
            Create a new account
          </h2>
          <p className="text-white text-xs">
            Fill out the form below to register
          </p>
        </div>

        {/* Register Form */}
        <div className="px-6 py-6">
          <Form
            name="registerForm"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* Full Name Field */}
            <Form.Item
              label={<span className="text-sm text-gray-700">Full Name</span>}
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                placeholder="Your full name"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              label={<span className="text-sm text-gray-700">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                placeholder="Your email"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label={<span className="text-sm text-gray-700">Password</span>}
              name="password"
              rules={[{ required: true, message: "Please create a password!" }]}
            >
              <Input.Password
                placeholder="Create a password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            {/* Confirm Password Field */}
            <Form.Item
              label={
                <span className="text-sm text-gray-700">Confirm Password</span>
              }
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
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
                className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          {/* Redirect to Login */}
          <div className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
