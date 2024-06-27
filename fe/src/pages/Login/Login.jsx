import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { login } from "../../helpers/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (val) => {
    try {
      const data = await login(val);
      if (data.success) {
        navigate("/");
      }
      console.log(data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen max-w-[376px] mx-auto">
      <Form className="w-full" form={form} onFinish={handleLogin}>
        <Form.Item>
          <div className="font-semibold text-center">
            Đăng nhập hệ thống chấm công
          </div>
        </Form.Item>
        <Form.Item name="username">
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password
            placeholder="Mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Button
          loading={loading}
          htmlType="submit"
          className="w-full"
          type="primary"
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
