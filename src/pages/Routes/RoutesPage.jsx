import React, { useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";
import DashboardHeader from "../../UI/Header";
import { usePostMutation, usePutMutation } from "../../services/apiService";
import RoutesList from "./RouteComponents/RouteList";
import routeimg from "../../assets/routesimg.png";

const RoutesPage = () => {
  const [form] = Form.useForm();
  const [showRoutesList, setShowRoutesList] = useState(false); // Toggle for routes list
  const [editingRoute, setEditingRoute] = useState(null); // State for editing route
  const [createRoute, { isLoading: creating }] = usePostMutation(); // Create route API hook
  const [updateRoute, { isLoading: updating }] = usePutMutation(); // Update route API hook
  const formRef = useRef(null); // Ref for scrolling to form

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = editingRoute
        ? await updateRoute({
            path: `route/update/${editingRoute.id}`,
            body: values,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).unwrap()
        : await createRoute({
            path: "route/create",
            body: values,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).unwrap();

      message.success(response.message || "Route saved successfully!");
      setEditingRoute(null); // Clear editing state
      form.resetFields(); // Reset form fields
      if (!showRoutesList) setShowRoutesList(true); // Show list after save
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to save route. Please try again."
      );
    }
  };

  const handleEdit = (route) => {
    if (route?.id) {
      setEditingRoute(route); // Set the current route for editing

      // Map the route fields to match the form field names
      const routeToEdit = {
        routeNumber: route.routeNumber,
        branchCode: route.branchCode, // Branch Code
        economicUnit: route.economicUnit, // Economic Unit
        username: route.user, // Set the username field from the route data
      };

      form.setFieldsValue(routeToEdit); // Populate the form with the route data

      if (!showRoutesList) setShowRoutesList(true); // Ensure the list is visible

      // Smooth scroll to the form
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      message.error("Invalid route ID for editing.");
    }
  };

  return (
    <>
      <DashboardHeader image={routeimg} />

      {/* Form Section */}
      <div
        className="bg-white w-[85%] p-6 mx-auto mt-4"
        ref={formRef} // Attach the ref to the form container
      >
        <Form
          form={form}
          name="routes_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Route Number</span>
              }
              name="routeNumber"
              rules={[{ required: true, message: "Route number is required!" }]}
            >
              <Input placeholder="Enter Route Number" />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Branch Code</span>
              }
              name="branchCode"
              rules={[{ required: true, message: "Branch code is required!" }]}
            >
              <Input placeholder="Enter Branch Code" />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Economic Unit</span>
              }
              name="economicUnit"
              rules={[
                { required: true, message: "Economic unit is required!" },
              ]}
            >
              <Input placeholder="Enter Economic Unit" />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Username</span>
              }
              name="username"
              rules={[{ required: true, message: "Username is required!" }]}
            >
              <Input placeholder="Enter Username" />
            </Form.Item>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <Button
              type="default"
              onClick={() => {
                form.resetFields();
                setEditingRoute(null); // Clear editing state
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating || updating}
            >
              {editingRoute ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </div>

      {/* Toggle Routes List Button */}
      <div className="flex justify-center mt-6">
        <Button
          type="default"
          size="large"
          onClick={() => setShowRoutesList(!showRoutesList)} // Toggle routes list
        >
          {showRoutesList ? "Hide Routes" : "Show Routes"}
        </Button>
      </div>

      {/* Routes List */}
      {showRoutesList && (
        <div className="mt-10">
          <RoutesList onEdit={handleEdit} />
        </div>
      )}
    </>
  );
};

export default RoutesPage;
