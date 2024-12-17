import { useState } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/reset.css";
import DashboardHeader from "../../UI/Header";
import Popup from "../../UI/PopUp"; // Import the Popup component

const RoutesPage = () => {
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
    <>
      {/* Header */}
      <DashboardHeader image="https://s3-alpha-sig.figma.com/img/e5e4/ae58/efa84fbdfb472b443c753c3af14cc88a?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fz9LIyg-IJR1f5Csea~QJGSbnN-fsbPAAGaera1vITNcdBW57r4ehkz1dLAOe71PoyZ6bH2j9VTEXNPqLl1pIgX66MCSQMMyDKIO3yVs85C1eo7adXRQSXRBaWi8BY9jAi-IHO2reR3DJFBk~xGbDZjIQRAvQkve1YUBEFDeYP7inZVSqIyv4BXHeRsW6AgnV-S-a1SvF8ZfPl~CFIlI97WbxZT~GRA~hZw8pnW5hyjmpPK5ar9QquMenhi63MegsH9H1u8clPS1VDS8KW-3jUXQglAJgzh5VHx4SrVsJH22UhI131EkxW0F6ROYkysADhkr4icFlCIxTh9zG9eR-Q__" />

      {/* Form Container */}
      <div className="bg-white w-[85%] p-6 mx-auto mt-4">
        <Form
          form={form}
          name="routes_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            {/* Route Number */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Route Number</span>
              }
              name="route_number"
              rules={[{ required: true, message: "Route number is required!" }]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter Route Number"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            {/* Branch */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">Branch</span>}
              name="branch"
              rules={[{ required: true, message: "Branch name is required!" }]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter Branch Name"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            {/* Economic Unit */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Economic Unit</span>
              }
              name="economic_unit"
              rules={[
                { required: true, message: "Economic unit is required!" },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter Economic Unit"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>

            {/* User */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">User</span>}
              name="user"
              rules={[{ required: true, message: "User name is required!" }]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter User Name"
                className="border rounded-md py-2 px-4"
              />
            </Form.Item>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4 space-x-4">
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
    </>
  );
};

export default RoutesPage;
