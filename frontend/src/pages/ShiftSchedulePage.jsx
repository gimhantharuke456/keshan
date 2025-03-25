import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Popconfirm,
  Tag,
  Typography,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { shiftApi } from "../api/shiftApi";
import moment from "moment";
import { userApi } from "../api/userApi";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const { Title } = Typography;
const { Option } = Select;

const ShiftSchedulePage = () => {
  const [shifts, setShifts] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentShift, setCurrentShift] = useState(null);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch shifts on component mount
  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const data = await shiftApi.getAll();
      const users = await userApi.getAllUsers();
      setShifts(data);
      setFilteredShifts(data);
      setUsers(users);
    } catch (error) {
      messageApi.error(error.message || "Failed to fetch shifts");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentShift(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentShift(record);
    form.setFieldsValue({
      user: record.user._id,
      startTime: moment(record.startTime),
      endTime: moment(record.endTime),
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await shiftApi.delete(id);
      messageApi.success("Shift deleted successfully");
      fetchShifts();
    } catch (error) {
      messageApi.error(error.message || "Failed to delete shift");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const shiftData = {
        ...values,
        startTime: values.startTime.toISOString(),
        endTime: values.endTime.toISOString(),
      };

      if (currentShift) {
        await shiftApi.update(currentShift._id, shiftData);
        messageApi.success("Shift updated successfully");
      } else {
        await shiftApi.create(shiftData);
        messageApi.success("Shift created successfully");
      }

      setModalVisible(false);
      fetchShifts();
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Shift Schedule", 14, 10);

    const tableColumn = [
      "Staff Member",
      "Email",
      "Start Time",
      "End Time",
      "Status",
    ];
    const tableRows = [];

    filteredShifts.forEach((shift) => {
      const shiftData = [
        shift.user.name,
        shift.user.email,
        moment(shift.startTime).format("YYYY-MM-DD HH:mm"),
        moment(shift.endTime).format("YYYY-MM-DD HH:mm"),
        shift.status,
      ];
      tableRows.push(shiftData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("ShiftSchedule.pdf");
  };
  useEffect(() => {
    filterShifts();
  }, [searchTerm, shifts]);
  const filterShifts = () => {
    const filtered = shifts.filter(
      (shift) =>
        shift.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shift.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShifts(filtered);
  };
  const columns = [
    {
      title: "Staff Member",
      dataIndex: ["user", "name"],
      key: "user",
      render: (text, record) => `${record.user.name} (${record.user.email})`,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "scheduled":
            color = "blue";
            break;
          case "in-progress":
            color = "orange";
            break;
          case "completed":
            color = "green";
            break;
          case "cancelled":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.status !== "scheduled"}
          />
          <Popconfirm
            title="Are you sure to delete this shift?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            disabled={record.status !== "scheduled"}
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              disabled={record.status !== "scheduled"}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={3}>Shift Schedule</Title>
        <Space>
          <Input
            placeholder="Search by Staff Name or Email"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
          />
          <Button
            type="primary"
            icon={<FilePdfOutlined />}
            onClick={generatePDF}
          >
            Export PDF
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Shift
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredShifts}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={currentShift ? "Edit Shift" : "Add New Shift"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="user"
            label="Staff Member"
            rules={[
              { required: true, message: "Please select a staff member" },
            ]}
          >
            <Select placeholder="Select staff member">
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {`${user.name} (${user.email})`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: "Please select start time" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="End Time"
            rules={[
              { required: true, message: "Please select end time" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    !getFieldValue("startTime") ||
                    value > getFieldValue("startTime")
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject("End time must be after start time");
                },
              }),
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
              disabledDate={(current) => {
                const startTime = form.getFieldValue("startTime");
                return (
                  current &&
                  startTime &&
                  current < moment(startTime).startOf("day")
                );
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShiftSchedulePage;
