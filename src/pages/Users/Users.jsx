import { useState } from "react";
import { Form, Input, Button, Upload, Select, message, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Popup from "../../UI/PopUp";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import UserList from "./usersComponents/UserList"; // Import the UserList component
import { usePostMutation } from "../../services/apiService";

const Users = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [registerUser, { isLoading }] = usePostMutation(); // API hook
  const [showUserList, setShowUserList] = useState(false); // Toggle user list visibility
  const [phone, setPhone] = useState("");
  const [licenseImage, setLicenseImage] = useState(null);

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
      const formData = new FormData();
      formData.append("firstname", values.first_name);
      formData.append("lastname", values.last_name);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("role", values.role);
      formData.append("phone", phone || "");
      formData.append(
        "licenseExpirationDate",
        values.licenseExpirationDate || ""
      );

      // Append the license image if available
      if (licenseImage) {
        formData.append("licenseimage", licenseImage);
      }

      const response = await registerUser({
        path: "auth/register",
        body: formData,
      }).unwrap();

      message.success(response.message || "User registered successfully!");
      setShowPopup(true);
    } catch (error) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Username is required!" }]}
              >
                <Input
                  placeholder="Enter Username"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

              {/* First Name and Last Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    { required: true, message: "First name is required!" },
                  ]}
                >
                  <Input
                    placeholder="Enter First Name"
                    className="border rounded-md py-2 px-4"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    { required: true, message: "Last name is required!" },
                  ]}
                >
                  <Input
                    placeholder="Enter Last Name"
                    className="border rounded-md py-2 px-4"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password
                  placeholder="Enter Password"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Phone number is required!" },
                  {
                    pattern: /^\+?[1-9]\d{1,14}$/,
                    message: "Enter a valid phone number!",
                  },
                ]}
              >
                <PhoneInput
                  country={"us"} // Default country
                  value={phone}
                  onChange={(phone) => setPhone(phone)} // Update state on change
                  inputStyle={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid #d9d9d9",
                    padding: "8px",
                  }}
                  buttonStyle={{ borderRadius: "8px" }}
                  placeholder="Enter Phone Number"
                />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Form.Item label="License Number" name="licensenumber">
                <Input
                  placeholder="Enter License Number"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>
              <Form.Item
                label="License Expiration Date"
                name="licenseExpirationDate"
                rules={[
                  {
                    required: true,
                    message: "Please select the expiration date!",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select License Expiration Date"
                  format="YYYY-MM-DD" // Specify the date format
                />
              </Form.Item>
              <Form.Item
                label="Upload License"
                name="upload_license"
                rules={[
                  { required: true, message: "Please upload a license image!" },
                ]}
              >
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLicenseImage(e.target.files[0])}
                />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select placeholder="Select Role">
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
              onClick={() => form.resetFields()}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create{" "}
            </Button>
          </div>
        </Form>
      </div>

      {/* Toggle User List Button */}
      <div className="flex justify-center mt-6">
        <Button
          type="default"
          size="large"
          onClick={() => setShowUserList(!showUserList)}
        >
          {showUserList ? "Hide Users" : "Show Users"}
        </Button>
      </div>

      {/* User List */}
      {showUserList && (
        <div className="mt-10">
          <UserList onEdit={null} /> {/* Pass no edit handler */}
        </div>
      )}

      {/* Popup */}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Users;
