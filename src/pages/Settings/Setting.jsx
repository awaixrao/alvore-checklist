import React, { useState } from "react";
import { Switch, Card, Form, Input, Button, Table, Popconfirm, message } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../services/LanguageContext";
import DashboardHeader from "../../UI/Header";
import { useGetQuery, usePostMutation, useDeleteMutation } from "../../services/apiService";

const Setting = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();

  // Fetch insurance companies
  const { data: response, isLoading } = useGetQuery({
    path: "insurance-companies/get-all",
  });
  const insuranceCompanies = response?.data || [];

  // Update vehicle categories fetch and data extraction
  const { data: categoriesResponse, isLoading: categoriesLoading } = useGetQuery({
    path: "vehicle-category/get",
  });
  const vehicleCategories = Array.isArray(categoriesResponse) ? categoriesResponse : [];

  const [createInsuranceCompany] = usePostMutation();
  const [deleteInsuranceCompany] = useDeleteMutation();
  const [createVehicleCategory] = usePostMutation();
  const [deleteVehicleCategory] = useDeleteMutation();

  const onFinish = async (values) => {
    try {
      await createInsuranceCompany({
        path: "insurance-companies/create",
        body: values,
      }).unwrap();
      message.success("Insurance company added successfully!");
      form.resetFields();
    } catch (error) {
      message.error(error?.data?.message || "Failed to add insurance company");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInsuranceCompany({
        path: `insurance-companies/delete/${id}`,
      }).unwrap();
      message.success("Insurance company deleted successfully!");
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete insurance company");
    }
  };

  const onFinishCategory = async (values) => {
    try {
      await createVehicleCategory({
        path: "vehicle-category/create",
        body: { categoryname: values.categoryname },
      }).unwrap();
      message.success("Vehicle category added successfully!");
      categoryForm.resetFields();
    } catch (error) {
      message.error(error?.data?.message || "Failed to add vehicle category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteVehicleCategory({
        path: `vehicle-category/delete/${id}`,
      }).unwrap();
      message.success("Vehicle category deleted successfully!");
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete vehicle category");
    }
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this company?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const categoryColumns = [
    {
      title: "Category Name",
      dataIndex: "categoryname",
      key: "categoryname",
      sorter: (a, b) => a.categoryname.localeCompare(b.categoryname),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this category?"
          onConfirm={() => handleDeleteCategory(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <DashboardHeader />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-6">{t('settings.title')}</h2>
            
            {/* Language Switch */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">{t('settings.language')}</h3>
                <p className="text-gray-500 text-sm">
                  {t('settings.languageDescription')}
                </p>
              </div>
              <Switch
                checked={language === 'es'}
                onChange={toggleLanguage}
                checkedChildren="ES"
                unCheckedChildren="EN"
                className="bg-gray-300"
              />
            </div>
          </Card>

          {/* Insurance Companies Management */}
          <Card className="shadow-md">
            <h2 className="text-xl font-semibold mb-6">Insurance Companies Management</h2>
            
            {/* Add Insurance Company Form */}
            <div className="mb-6">
              <Form
                form={form}
                name="insurance_company"
                layout="inline"
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Company name is required!" },
                    { min: 2, message: "Name must be at least 2 characters!" }
                  ]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Enter insurance company name" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Company
                  </Button>
                </Form.Item>
              </Form>
            </div>

            {/* Insurance Companies Table */}
            <Table
              columns={columns}
              dataSource={Array.isArray(insuranceCompanies) ? insuranceCompanies : []}
              rowKey="_id"
              loading={isLoading}
              pagination={{ pageSize: 10 }}
              className="mt-4"
            />
          </Card>

          {/* Vehicle Categories Management */}
          <Card className="shadow-md">
            <h2 className="text-xl font-semibold mb-6">Vehicle Categories Management</h2>
            
            {/* Add Vehicle Category Form */}
            <div className="mb-6">
              <Form
                form={categoryForm}
                name="vehicle_category"
                layout="inline"
                onFinish={onFinishCategory}
              >
                <Form.Item
                  name="categoryname"
                  rules={[
                    { required: true, message: "Category name is required!" },
                    { min: 2, message: "Name must be at least 2 characters!" }
                  ]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Enter vehicle category name" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Category
                  </Button>
                </Form.Item>
              </Form>
            </div>

            {/* Vehicle Categories Table */}
            <Table
              columns={categoryColumns}
              dataSource={Array.isArray(vehicleCategories) ? vehicleCategories : []}
              rowKey="_id"
              loading={categoriesLoading}
              pagination={{ pageSize: 10 }}
              className="mt-4"
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Setting;
