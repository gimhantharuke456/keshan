import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { userApi } from "../api/userApi";

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  // Email regex pattern for validation
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await userApi.login(values);
      messageApi.success("Login successful!");

      // Store user data and token
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("userId", response.user.id);
      // Redirect based on role
      if (response.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (response.user.role === "user") {
        navigate("/customer");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {contextHolder}
      <Card className="auth-card">
        <Title level={2} className="auth-title">
          Login to Your Account
        </Title>

        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern: EMAIL_REGEX,
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>

          <div className="auth-footer">
            <span>Don't have an account? </span>
            <a href="/register">Register now</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
