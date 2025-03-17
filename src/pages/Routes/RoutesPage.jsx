import React, { useState, useRef } from "react";
import { Form, Input, Select, Button, message } from "antd";
import "antd/dist/reset.css";
import DashboardHeader from "../../UI/Header";
import { usePostMutation, usePutMutation, useGetQuery } from "../../services/apiService";
import RoutesList from "./RouteComponents/RouteList";
import routeimg from "../../assets/routesimg.png";
import Popup from "../../UI/PopUp";

const RoutesPage = () => {
  
  const [form] = Form.useForm();
  const [showRoutesList, setShowRoutesList] = useState(false); // Toggle for routes list
  const [editingRoute, setEditingRoute] = useState(null); // State for editing route
  const [createRoute, { isLoading: creating }] = usePostMutation(); // Create route API hook
  const [updateRoute, { isLoading: updating }] = usePutMutation(); // Update route API hook
  const formRef = useRef(null); // Ref for scrolling to form
  const [units, setUnits] = useState([]); // State to hold all units
  const [filteredUnits, setFilteredUnits] = useState([]); // State to hold filtered units based on branch
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility

  // Fetch users and branch codes using API queries
  const { data: users } = useGetQuery({ path: "auth/users" });
  const { data: branches } = useGetQuery({ path: "branch/get_all" });
  const { data: unitsResponse } = useGetQuery({ path: "car/get_all" }); // Fetch all units

  // Set units when the component mounts
  React.useEffect(() => {
    if (unitsResponse) {
      setUnits(unitsResponse.data || []);
    }
  }, [unitsResponse]);

  const handleBranchChange = (branchCode) => {
    // Filter units based on the selected branch code
    const filtered = units.filter(unit => unit.branch.branchCode === branchCode);
    setFilteredUnits(filtered); // Update the filtered units state
  };

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = editingRoute
        ? await updateRoute({
            path: `route/update/${editingRoute.id}`,
            body: {
              ...values,
              economicUnit: values.economicNumber,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).unwrap()
        : await createRoute({
            path: "route/create",
            body: {
              ...values,
              economicUnit: values.economicNumber,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).unwrap();

      message.success(response.message || "Route saved successfully!");
      setEditingRoute(null); // Clear editing state
      form.resetFields(); // Reset form fields
      setShowPopup(true); // Show the congratulatory popup
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
        economicUnit: route.economicUnit, // Set this to match the expected field name
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
              label={<span className="text-gray-700 font-medium">Route Number</span>}
              name="routeNumber"
              rules={[{ required: true, message: "Route number is required!" }]}
            >
              <Input placeholder="Enter Route Number" />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Branch Code</span>}
              name="branchCode"
              rules={[{ required: true, message: "Branch code is required!" }]}
            >
              <Select placeholder="Select Branch Code" onChange={handleBranchChange}>
                {branches?.data?.map((branch) => (
                  <Select.Option key={branch._id} value={branch.branchCode}>
                    {branch.branchCode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Economic Number</span>}
              name="economicNumber"
              rules={[{ required: true, message: "Economic number is required!" }]}
            >
              <Select placeholder="Select Economic Number">
                {filteredUnits.map((unit) => (
                  <Select.Option key={unit._id} value={unit.unitNumber}>
                    {unit.unitNumber}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Username</span>}
              name="username"
              rules={[{ required: true, message: "Username is required!" }]}
            >
              <Select placeholder="Select Username">
                {users?.users?.map((user) => (
                  <Select.Option key={user._id} value={user.username}>
                    {user.username}
                  </Select.Option>
                ))}
              </Select>
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

      {/* Popup for congratulatory message */}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default RoutesPage;
