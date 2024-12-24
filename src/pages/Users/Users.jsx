import { useState } from "react";
import { Form, Input, Button, Upload, Select, message } from "antd";
import "antd/dist/reset.css";
import { UploadOutlined } from "@ant-design/icons";
import Popup from "../../UI/PopUp";
import { usePostMutation } from "../../services/apiService"; // Adjust the path to your apiSlice

const Users = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [registerUser, { isLoading }] = usePostMutation(); // API hook

  // State for displaying the top bar details
  const [firstName, setFirstName] = useState(""); // First Name
  const [lastName, setLastName] = useState(""); // Last Name

  // Generate initials for the profile image
  const getInitials = () => {
    const firstInitial = firstName.charAt(0).toUpperCase() || "";
    const lastInitial = lastName.charAt(0).toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  // Submit handler
  const onFinish = async (values) => {
    try {
      // Adjust the payload to match API requirements
      const payload = {
        firstname: values.first_name,
        lastname: values.last_name,
        username: values.username,
        licensenumber: values.license_number || "",
        licenseimage: "", // Placeholder since image upload handling isn't covered here
        password: values.password,
        role: values.role,
        phone: values.phone || "",
        expirationdate: values.expiration_date || "",
      };

      // Call the API
      const response = await registerUser({
        path: "auth/register", // Adjust path as necessary
        body: payload,
      }).unwrap();

      // Handle success
      console.log("API Response:", response);
      message.success(response.message || "User registered successfully!");
      setShowPopup(true); // Show popup after successful registration
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      message.error(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form Submission Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen">
      {/* Gradient Profile Section */}
      <div
        className="bg-gradient-to-b from-blue-100 to-white rounded-b-lg p-8 flex flex-col items-center"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="bg-gray-300 h-24 w-24 rounded-full flex items-center justify-center text-gray-500 text-4xl font-bold shadow-md">
          {/* User Image Placeholder */}
          <span>{getInitials()}</span>
        </div>
        <h2 className="text-gray-800 font-medium text-2xl mt-4">
          {firstName || "First Name"} {lastName || "Last Name"}
        </h2>
      </div>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-[85%] mx-auto mt-8">
        <Form
          form={form}
          name="users_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Username</span>
                }
                name="username"
                rules={[{ required: true, message: "Username is required!" }]}
              >
                <Input
                  placeholder="Enter Username"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

              {/* First Name and Last Name Fields Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      First Name
                    </span>
                  }
                  name="first_name"
                  rules={[
                    { required: true, message: "First name is required!" },
                  ]}
                >
                  <Input
                    placeholder="Enter First Name"
                    className="border rounded-md py-2 px-4"
                    onChange={(e) => setFirstName(e.target.value)} // Update state
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Last Name</span>
                  }
                  name="last_name"
                  rules={[
                    { required: true, message: "Last name is required!" },
                  ]}
                >
                  <Input
                    placeholder="Enter Last Name"
                    className="border rounded-md py-2 px-4"
                    onChange={(e) => setLastName(e.target.value)} // Update state
                  />
                </Form.Item>
              </div>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Password</span>
                }
                name="password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password
                  placeholder="Enter Password"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Phone Number
                  </span>
                }
                name="phone"
              >
                <Input
                  placeholder="Enter Phone Number"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    License Number
                  </span>
                }
                name="license_number"
              >
                <Input
                  placeholder="Enter License Number"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    License Expiration Date
                  </span>
                }
                name="expiration_date"
              >
                <Input
                  placeholder="Enter License Expiration Date"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Upload License
                  </span>
                }
                name="upload_license"
              >
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>

              {/* Role Dropdown */}
              <Form.Item
                label={<span className="text-gray-700 font-medium">Role</span>}
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select placeholder="Select Role" className="border rounded-md">
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="customer">Driver</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-4">
            <Button
              type="default"
              htmlType="button"
              className="rounded border border-gray-300 px-6 py-2 text-gray-600 hover:bg-gray-100"
              onClick={() => form.resetFields()}
            >
              Return
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="rounded bg-blue-600 hover:bg-blue-500 px-6 py-2"
            >
              Send now
            </Button>
          </div>
        </Form>
      </div>

      {/* Popup */}
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)} // Close the popup when button is clicked
        />
      )}
    </div>
  );
};

export default Users;
