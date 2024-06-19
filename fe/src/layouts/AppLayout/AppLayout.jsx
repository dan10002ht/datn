import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const defaultPath = [{ label: "Trang chủ", path: "/" }];

const navItems = [
  {
    key: "/",
    label: "Trang chủ",
    url: "/",
    breadCrumb: defaultPath,
  },
  {
    key: "/personnel/employees",
    label: "Nhân sự",
    url: "/personnel/employees",
    breadCrumb: [
      ...defaultPath,
      { label: "Nhân sự", path: "/personnel/employees" },
    ],
  },
  {
    key: "/request",
    label: "Yêu cầu",
    url: "/request",
    breadCrumb: [...defaultPath, { label: "Nhân sự", path: "/request" }],
  },
  {
    key: "/working-day/timekeeping",
    label: "Chấm công",
    url: "/working-day/timekeeping",
    breadCrumb: [
      ...defaultPath,
      {
        label: "Chấm công",
        path: "/working-day/timekeeping",
      },
    ],
  },
];

const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={300}
        style={{
          height: "100vh",
          position: "sticky",
        }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[window.location.pathname]}
          items={navItems}
          onClick={({ key }) => navigate(key)}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Sider>
      <Content style={{ padding: "0 48px", height: "100vh", overflow: "auto" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {navItems
            .find(({ key }) => key === window.location.pathname)
            .breadCrumb.map((x) => (
              <Breadcrumb.Item key={x.path} onClick={() => navigate(x.path)}>
                {x.label}
              </Breadcrumb.Item>
            ))}
        </Breadcrumb>
        <div
          className={`min-h-[280px] p-10 rounded-lg`}
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
