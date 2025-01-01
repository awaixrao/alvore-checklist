import React, { useState, useRef } from "react";
import { Form, Input, Select, Button, message } from "antd";
import "antd/dist/reset.css";
import DashboardHeader from "../../UI/Header";
import Popup from "../../UI/PopUp";
import unitimg from "../../assets/unitimg.png";
import UnitList from "./unitsComponents/UnitList";
import { usePostMutation, usePutMutation } from "../../services/apiService";

const { Option } = Select;

const Units = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [showUnitList, setShowUnitList] = useState(false);
  const [createUnit, { isLoading: creating }] = usePostMutation();
  const [updateUnit, { isLoading: updating }] = usePutMutation();
  const [insuranceFile, setInsuranceFile] = useState(null); // Store insurance file as binary
  const [vehicleCardFile, setVehicleCardFile] = useState(null); // Store vehicle card file as binary
  const formRef = useRef(null);

  const handleFileChange = (e, setFileState) => {
    const file = e.target.files[0];
    if (file) {
      setFileState(file);
      message.success(`${file.name} selected successfully!`);
    } else {
      setFileState(null);
    }
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("unitNumber", values.unitNumber);
      formData.append("plate", values.plate);
      formData.append("brand", values.brand);
      formData.append("model", values.model);
      formData.append("color", values.color);
      formData.append("year", values.year);
      formData.append("insuranceCompany", values.insuranceCompany);
      formData.append("branchCode", values.branchCode);
      formData.append("category", values.category);

      if (insuranceFile) {
        formData.append("insuranceUpload", insuranceFile);
      }
      if (vehicleCardFile) {
        formData.append("vehicleCardUpload", vehicleCardFile);
      }

      const response = editingUnit
        ? await updateUnit({
            path: `car/update/${editingUnit.id}`,
            body: formData,
          }).unwrap()
        : await createUnit({
            path: "car/create",
            body: formData,
          }).unwrap();

      message.success(response.message || "Unit saved successfully!");
      setShowPopup(true);
      form.resetFields();
      setInsuranceFile(null);
      setVehicleCardFile(null);
      setEditingUnit(null);
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to save unit. Please try again."
      );
    }
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);

    // Safely access branchCode and set it in the form
    form.setFieldsValue({
      unitNumber: unit.unitNumber,
      plate: unit.plate,
      brand: unit.brand,
      model: unit.model,
      color: unit.color,
      year: unit.year,
      insuranceCompany: unit.insuranceCompany,
      branchCode: unit.branch?.branchCode || "", // Use empty string if not available
      category: unit.category,
    });

    // Store previous file URLs to show images
    setInsuranceFile(unit.insuranceUpload || null);
    setVehicleCardFile(unit.vehicleCardUpload || null);

    // Scroll to the form
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <DashboardHeader image={unitimg} />

      <div className="bg-white w-[85%] p-6 mx-auto mt-4" ref={formRef}>
        <Form
          form={form}
          name="units_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            <Form.Item
              label="Unit Number"
              name="unitNumber"
              rules={[{ required: true, message: "Unit number is required!" }]}
            >
              <Input placeholder="Enter unit number" />
            </Form.Item>

            <Form.Item
              label="Plate"
              name="plate"
              rules={[{ required: true, message: "Plate number is required!" }]}
            >
              <Input placeholder="Enter plate number" />
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Brand is required!" }]}
            >
              <Input placeholder="Enter brand" />
            </Form.Item>

            <Form.Item
              label="Model"
              name="model"
              rules={[{ required: true, message: "Model is required!" }]}
            >
              <Input placeholder="Enter model" />
            </Form.Item>

            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: "Color is required!" }]}
            >
              <Input placeholder="Enter color" />
            </Form.Item>

            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: "Year is required!" }]}
            >
              <Input placeholder="Enter year" />
            </Form.Item>

            <Form.Item
              label="Insurance Company"
              name="insuranceCompany"
              rules={[
                { required: true, message: "Insurance company is required!" },
              ]}
            >
              <Select placeholder="Select insurance company">
                <Option value="State Farm">State Farm</Option>
                <Option value="Mapfre">Mapfre</Option>
                <Option value="Allianz">Allianz</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Branch Code"
              name="branchCode"
              rules={[{ required: true, message: "Branch code is required!" }]}
            >
              <Input placeholder="Enter branch code" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Category is required!" }]}
            >
              <Select placeholder="Select category">
                <Option value="Delivery Units">Delivery Units</Option>
                <Option value="Sales Units">Sales Units</Option>
                <Option value="Supervision Units">Supervision Units</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Upload Insurance" name="insuranceUpload">
              {insuranceFile ? (
                <div className="mb-2">
                  <img
                    src={insuranceFile}
                    alt="Insurance"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ) : null}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setInsuranceFile)}
              />
            </Form.Item>

            <Form.Item label="Upload Vehicle Card" name="vehicleCardUpload">
              {vehicleCardFile ? (
                <div className="mb-2">
                  <img
                    src={vehicleCardFile}
                    alt="Vehicle Card"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ) : null}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setVehicleCardFile)}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <Button
              type="default"
              onClick={() => {
                form.resetFields();
                setEditingUnit(null);
                setInsuranceFile(null);
                setVehicleCardFile(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating || updating}
            >
              {editingUnit ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          type="default"
          size="large"
          onClick={() => setShowUnitList(!showUnitList)}
        >
          {showUnitList ? "Hide Units" : "Show Units"}
        </Button>
      </div>

      {showUnitList && (
        <div className="mt-10">
          <UnitList onEdit={handleEdit} />
        </div>
      )}

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Units;
