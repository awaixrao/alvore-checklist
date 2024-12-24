import { useState } from "react";
import { Form, Input, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import DashboardHeader from "../../UI/Header";
import Popup from "../../UI/PopUp";
import { usePostMutation } from "../../services/apiService"; // Adjust the path to your apiSlice

const { Option } = Select;

const Units = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [createCar, { isLoading }] = usePostMutation(); // Hook for the create API

  // Submit handler
  const onFinish = async (values) => {
    try {
      // Create payload with placeholder values for images
      const payload = {
        unitNumber: values.unitNumber,
        plate: values.plate,
        brand: values.brand,
        model: values.model,
        color: values.color,
        year: values.year,
        insuranceCompany: values.insuranceCompany,
        branchCode: values.branchCode,
        insuranceUpload:
          values.insuranceUpload ||
          "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        vehicleCardUpload:
          values.vehicleCardUpload ||
          "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      };

      // Call the API
      const response = await createCar({
        path: "car/create", // API endpoint
        body: payload,
      }).unwrap();

      // Handle success
      console.log("API Response:", response);
      message.success(response.message || "Car created successfully!");
      setShowPopup(true); // Show popup after successful creation
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      message.error(
        error?.data?.message || "Failed to create car. Please try again."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form Submission Failed:", errorInfo);
  };

  return (
    <>
      {/* Header */}
      <DashboardHeader image="https://s3-alpha-sig.figma.com/img/b036/6299/6178daabc29451041c2891eddcbcd375?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=feajsKnHYI~LTYowj-0kUTFGCBlm2JPXwlKXnUetIR~Eg3~utV8vm2Nof6n9bVhi1FLicDp9tCgVlaBCeSDw2bHtQHD9bnYIMGPqZqJC5J52saYFjGlch1evfjTFF9wAQInYCryRTbBwgfXVp2FKH9~6zM7uwjnrc~fWIih3NnXe4-yKP3jfpEvZE3ROYDU81quOwypvBC3jV94EizxPdr6PKOStvaTEEes9k1xx5Cz7ZM3x7M4P2DLCRAHsN-D6HhkmBOrEzDFRZiL84vEw284nTKVjmVCg9fVoOp9ivA~8370K9BEkU4ebx6qa9RpIKPiHda3p5YGLkh2JYnNw8Q__" />

      {/* Form Container */}
      <div className="bg-white w-[85%] p-6 mx-auto mt-4">
        <Form
          form={form}
          name="units_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Unit Number</span>
              }
              name="unitNumber"
              className="mb-0"
              rules={[{ required: true, message: "Unit number is required!" }]}
            >
              <Input
                placeholder="Unit Number"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Plate</span>}
              name="plate"
              className="mb-0"
              rules={[{ required: true, message: "Plate number is required!" }]}
            >
              <Input
                placeholder="Plate Number"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Brand</span>}
              name="brand"
              className="mb-0"
              rules={[{ required: true, message: "Brand is required!" }]}
            >
              <Input
                placeholder="Brand"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Model</span>}
              name="model"
              className="mb-0"
              rules={[{ required: true, message: "Model is required!" }]}
            >
              <Input
                placeholder="Model"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Color</span>}
              name="color"
              className="mb-0"
              rules={[{ required: true, message: "Color is required!" }]}
            >
              <Input
                placeholder="Color"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Year</span>}
              name="year"
              className="mb-0"
              rules={[{ required: true, message: "Year is required!" }]}
            >
              <Input
                placeholder="Year"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Insurance Company
                </span>
              }
              name="insuranceCompany"
              className="mb-0"
              rules={[
                { required: true, message: "Insurance company is required!" },
              ]}
            >
              <Select
                placeholder="Select Insurance Company"
                className="rounded-md"
              >
                <Option value="State Farm">State Farm</Option>
                <Option value="Mapfre">Mapfre</Option>
                <Option value="Allianz">Allianz</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Branch Code</span>
              }
              name="branchCode"
              className="mb-0"
              rules={[{ required: true, message: "Branch Code is required!" }]}
            >
              <Input
                placeholder="Branch"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Upload Insurance
                </span>
              }
              name="insuranceUpload"
              className="mb-0"
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Upload Insurance</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Upload Vehicle Card
                </span>
              }
              name="vehicleCardUpload"
              className="mb-0"
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Upload Vehicle Card</Button>
              </Upload>
            </Form.Item>
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
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Units;
