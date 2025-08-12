import { Avatar, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function UserCard({ user }) {
  return (
    <Space
      style={{
        width: "100%",
        paddingInline: 16,
        borderRadius: 8,
      }}
      size={16}
    >
      <Avatar size={50} icon={<UserOutlined />} />
      <Text>{user.name}</Text>
    </Space>
  );
}
