import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useDispatch } from "react-redux";
import { usePostMutation } from "../../services/apiService"; // Adjust the path to your apiSlice
import { login } from "../../features/AuthSlice/authSlice";
import logo from "../../assets/alvorelogo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginApi, { isLoading }] = usePostMutation();

  const onFinish = async (values) => {
    try {
      const response = await loginApi({
        path: "auth/login",
        body: values,
      }).unwrap();

      console.log("Login API response:", response); // Debug response

      // Check user role and store authentication data
      if (response?.user?.role === "admin") {
        console.log("Response is valid, navigating to /");

        // Dispatch to Redux store
        dispatch(login(response));

        // Optional: Persist to localStorage
        // localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));

        message.success("Login successful!");

        console.log("Before navigating to /");
        navigate("/"); // Redirect to dashboard
        console.log("After navigating to /");
      } else {
        message.error("Access denied. Only admins can log in.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 py-6 px-6 flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-14 w-auto mb-2" />
          <h2 className="text-2xl font-bold text-white mb-1">
            Sign in to your account
          </h2>
          <p className="text-white text-xs">
            Enter your username and password to log in
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
                loading={isLoading} // Show loading spinner during login
                className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Access
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
