import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

const ResetPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/login"); // Navigate back to login after password reset
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 py-6 px-6 flex flex-col items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/906b/c7ba/0245aec5f7480e8e14edaade481def72"
            alt="Logo"
            className="h-14 w-auto mb-2"
          />
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
