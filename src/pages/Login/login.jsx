import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/"); // Navigate after successful login
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
            Sign in to your account
          </h2>
          <p className="text-white text-xs">
            Enter your email and password to log in
          </p>
        </div>

        {/* Login Form */}
        <div className="px-6 py-6">
          <Form
            name="loginForm"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* Username Field */}
            <Form.Item
              label={<span className="text-sm text-gray-700">Username</span>}
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label={<span className="text-sm text-gray-700">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </Form.Item>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-sm text-gray-600">
                  Remember me
                </Checkbox>
              </Form.Item>
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Have you forgotten your password?
              </a>
            </div>

            {/* Submit Button */}
            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Access
              </Button>
            </Form.Item>
          </Form>

          {/* Register Link */}
          <div className="text-sm text-gray-600 text-center">
            New here?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Click here to register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;