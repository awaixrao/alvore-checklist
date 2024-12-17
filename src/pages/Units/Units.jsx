import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import "antd/dist/reset.css";
import DashboardHeader from "../../UI/Header";
import Popup from "../../UI/PopUp";

const { Option } = Select;

const Units = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false);

  // Submit handler
  const onFinish = (values) => {
    console.log("Form Submitted Successfully:", values);
    setShowPopup(true);
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
              name="unit_number"
              className="mb-0"
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
            >
              <Input
                placeholder="Year"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Insurance Upload
                </span>
              }
              name="insurance"
              className="mb-0"
            >
              <Input
                placeholder="Insurance Details"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Insurance Company
                </span>
              }
              name="insurance_company"
              className="mb-0"
            >
              <Select
                placeholder="Select Insurance Company"
                className="rounded-md"
              >
                <Option value="Company A">Company A</Option>
                <Option value="Company B">Company B</Option>
                <Option value="Company C">Company C</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Branch</span>}
              name="branch"
              className="mb-0"
            >
              <Input
                placeholder="Branch"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Upload Vehicle Card
                </span>
              }
              name="vehicle_card"
              className="mb-0"
            >
              <Input
                placeholder="Upload Image"
                className="border rounded-md py-2 px-4"
              />
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