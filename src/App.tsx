import { Layout } from "antd";
import SideBar from "./components/SideBar";
import ContentMessage from "./components/ContentMessage";
import UserCard from "./components/UserCard";

const { Content, Sider, Header } = Layout;

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  borderRightColor: "rgba(255, 255, 255, .1)",
  borderRightWidth: 1,
  borderRightStyle: "solid",
};

const layoutStyle: React.CSSProperties = {
  overflow: "hidden",
  height: "100vh",
};

const user = { id: 1, name: "Test", href: "test" };

export default function App() {
  return (
    <>
      <Layout style={layoutStyle}>
        <Sider width="16rem" style={siderStyle}>
          <SideBar />
        </Sider>
        <Layout>
          <Header>
            <UserCard user={user} />
          </Header>
          <Content style={contentStyle}>
            <ContentMessage />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
