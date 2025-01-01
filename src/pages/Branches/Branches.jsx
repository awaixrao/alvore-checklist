import React, { useState, useRef } from "react";
import { Form, Input, Select, Button, message } from "antd";
import "antd/dist/reset.css";
import DashboardHeader from "../../UI/Header";
import { usePostMutation, usePutMutation } from "../../services/apiService";
import BranchList from "./branchescomponents/BranchList";
import branchimg from "../../assets/branchesimg.png";

const { Option } = Select;

const Branches = () => {
  const [form] = Form.useForm();
  const [showBranchList, setShowBranchList] = useState(false); // Toggle for branch list
  const [editingBranch, setEditingBranch] = useState(null); // State for branch being edited
  const [createBranch, { isLoading: creating }] = usePostMutation(); // Create branch hook
  const [updateBranch, { isLoading: updating }] = usePutMutation(); // Update branch hook
  const formRef = useRef(null); // Ref for the form

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = editingBranch
        ? await updateBranch({
            path: `branch/update/${editingBranch.id}`, // Use correct `id`
            body: values,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).unwrap()
        : await createBranch({
            path: "branch/create",
            body: values,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).unwrap();

      message.success(response.message || "Branch saved successfully!");
      setEditingBranch(null); // Clear editing state
      form.resetFields(); // Reset form
      if (!showBranchList) setShowBranchList(true); // Show list after save
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to save branch. Please try again."
      );
    }
  };

  const handleEdit = (branch) => {
    if (branch?.id) {
      setEditingBranch(branch); // Set branch for editing
      form.setFieldsValue(branch); // Populate form with branch data
      if (!showBranchList) setShowBranchList(true); // Ensure list is visible

      // Scroll to form
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      message.error("Invalid branch ID for editing.");
    }
  };

  return (
    <>
      <DashboardHeader image={branchimg} />

      {/* Form Section */}
      <div
        className="bg-white w-[85%] p-6 mx-auto mt-4"
        ref={formRef} // Attach the ref to the form container
      >
        <Form
          form={form}
          name="branch_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            <Form.Item
              label="Branch Code"
              name="branchCode"
              rules={[{ required: true, message: "Branch code is required!" }]}
            >
              <Input placeholder="Enter branch code" />
            </Form.Item>
            <Form.Item
              label="Branch Name"
              name="branchName"
              rules={[{ required: true, message: "Branch name is required!" }]}
            >
              <Input placeholder="Enter branch name" />
            </Form.Item>
            <Form.Item
              label="Branch Address"
              name="branchAddress"
              rules={[
                { required: true, message: "Branch address is required!" },
              ]}
            >
              <Input placeholder="Enter branch address" />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Country is required!" }]}
            >
              <Select placeholder="Select country">
                <Option value="Mexico">Mexico</Option>
                <Option value="Guatemala">Guatemala</Option>
                <Option value="El Salvador">El Salvador</Option>
              </Select>
            </Form.Item>
            <Form.Item label="State" name="state">
              <Input placeholder="Enter state" />
            </Form.Item>
            <Form.Item label="Branch Details" name="branchDetails">
              <Input placeholder="Enter additional details" />
            </Form.Item>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <Button
              type="default"
              onClick={() => {
                form.resetFields();
                setEditingBranch(null); // Clear editing state
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating || updating}
            >
              {editingBranch ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </div>

      {/* Toggle Branch List Button */}
      <div className="flex justify-center mt-6">
        <Button
          type="default"
          size="large"
          onClick={() => setShowBranchList(!showBranchList)} // Toggle branch list
        >
          {showBranchList ? "Hide Branches" : "Show Branches"}
        </Button>
      </div>

      {/* Branch List */}
      {showBranchList && (
        <div className="mt-10">
          <BranchList onEdit={handleEdit} />
        </div>
      )}
    </>
  );
};

export default Branches;
