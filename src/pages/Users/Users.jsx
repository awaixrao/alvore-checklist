import { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import "antd/dist/reset.css";
import { UploadOutlined } from "@ant-design/icons";
import Popup from "../../UI/PopUp";

const Users = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  // Submit handler
  const onFinish = (values) => {
    console.log("Form Submitted Successfully:", values);
    setShowPopup(true); // Show the popup
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
          <span>IK</span>
        </div>
        <h2 className="text-gray-800 font-medium text-2xl mt-4">Ilhan Karim</h2>
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
            {/* Left Column: 5 Fields */}
            <div className="space-y-4">
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Employee/User ID
                  </span>
                }
                name="employee_id"
                rules={[
                  { required: true, message: "Employee/User ID is required!" },
                ]}
              >
                <Input
                  placeholder="Enter Employee/User ID"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">First Name</span>
                }
                name="first_name"
                rules={[{ required: true, message: "First name is required!" }]}
              >
                <Input
                  placeholder="Enter First Name"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

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
                    Mobile Number
                  </span>
                }
                name="mobile_number"
              >
                <Input
                  placeholder="Enter Mobile Number"
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
            </div>

            {/* Right Column: 3 Fields */}
            <div className="space-y-4">
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Last Name</span>
                }
                name="last_name"
                rules={[{ required: true, message: "Last name is required!" }]}
              >
                <Input
                  placeholder="Enter Last Name"
                  className="border rounded-md py-2 px-4"
                />
              </Form.Item>

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
                    Upload License
                  </span>
                }
                name="upload_license"
              >
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
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
