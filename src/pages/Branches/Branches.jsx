import { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import "antd/dist/reset.css";
import DashboardHeader from "../../UI/Header";
import Popup from "../../UI/PopUp"; // Import the Popup component
import { usePostMutation } from "../../services/apiService"; // Import the API service

const { Option } = Select;

const Branches = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [createBranch, { isLoading }] = usePostMutation(); // Hook for the create API

  // Submit handler
  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage or your auth state
      const response = await createBranch({
        path: "branch/create", // API endpoint
        body: values,
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      }).unwrap();

      // Handle success
      console.log("API Response:", response);
      message.success(response.message || "Branch created successfully!");
      setShowPopup(true); // Show the popup after successful creation
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      message.error(
        error?.data?.message || "Failed to create branch. Please try again."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form Submission Failed:", errorInfo);
  };

  return (
    <>
      {/* Header */}
      <DashboardHeader image="https://s3-alpha-sig.figma.com/img/a16e/8036/f28a00c058d3efc242fdde5ce43bfe80?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o20znAo~DHXM0cHGus3VDwFUkl6~DIek4ZDMIMs7amx3VuNSQpfVRm7-j17w7vTwgsqHbA~a3jO2CaQi-bWXw4FdXkOtu0yFUAsQdBIJCG0-draWIS3S6RxijTDK2VU20jDiwe5qTQB5U6ZoOZpSOINUKisWe1sNoNR7bM50ySP2p9Y6VBhmx480wC2V8s2xFyF-6AImsbfR817vJ-wdlyHJiqqwVBUK24J260n581v~Z9Cy1vvDY3d~VTDbnF6I6TXVKhYXnUuVMIpo62rVbD~plfMYPHqYScYSGjtGmCgMoUYg2sWnDeUrrjdZMjr8-AES384nsUbRfxtGuRDhEw__" />

      {/* Form Container */}
      <div className="bg-white w-[85%] p-6 mx-auto mt-4">
        <Form
          form={form}
          name="branch_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Branch code</span>
              }
              name="branchCode"
              rules={[{ required: true, message: "Branch code is required!" }]}
              className="ant-form-item-required m-0"
            >
              <Input
                placeholder="Code"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Branch name</span>
              }
              name="branchName"
              rules={[{ required: true, message: "Branch name is required!" }]}
              className="ant-form-item-required m-0"
            >
              <Input
                placeholder="Name"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Branch address
                </span>
              }
              name="branchAddress"
              rules={[
                { required: true, message: "Branch address is required!" },
              ]}
              className="ant-form-item-required m-0"
            >
              <Input
                placeholder="Address"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Country</span>}
              name="country"
              rules={[{ required: true, message: "Country is required!" }]}
              className="ant-form-item-required m-0"
            >
              <Select placeholder="Select" className="rounded-md">
                <Option value="Mexico">Mexico</Option>
                <Option value="Guatemala">Guatemala</Option>
                <Option value="El Salvador">El Salvador</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">State</span>}
              name="state"
              className="m-0"
            >
              <Input
                placeholder="State"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Branch details
                </span>
              }
              name="branchDetails"
              className="m-0"
            >
              <Input
                placeholder="Details"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-4">
            <Button
              type="default"
              htmlType="button"
              className="rounded border border-gray-300 px-6 py-4 text-gray-600 hover:bg-gray-100"
              onClick={() => form.resetFields()}
            >
              Return
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="rounded bg-blue-600 hover:bg-blue-500 px-6 py-4"
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
    </>
  );
};

export default Branches;
