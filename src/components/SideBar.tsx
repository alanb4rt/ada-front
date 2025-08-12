import { Flex, Space, Typography } from "antd";
import UserCard from "./UserCard";

const { Title } = Typography;

const users = [
  { id: 1, name: "Test", href: "test" },
  { id: 2, name: "Test", href: "test" },
  { id: 3, name: "Test", href: "test" },
  { id: 4, name: "Test", href: "test" },
  { id: 5, name: "Test", href: "test" },
];

export default function SideBar() {
  return (
    <Flex vertical>
      <Title level={4}>ADA</Title>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Space>
    </Flex>
  );
}
