import { Layout } from "antd";
import SideBar from "./components/SideBar";
import ContentMessage from "./components/ContentMessage";

const { Content, Sider } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#1E1D1F",
};

const layoutStyle = {
  overflow: "hidden",
  height: "100vh",
};

export default function App() {
  return (
    <>
      <Layout style={layoutStyle}>
        <Sider width="20%" style={siderStyle}>
          <SideBar />
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <ContentMessage />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
