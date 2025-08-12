import { Flex, Input, Typography } from "antd";
import MessageCard from "./messageCard";

const { Title } = Typography;

const inputStyle: React.CSSProperties = {
  borderRadius: 8,
  backgroundColor: "#1D1D1D",
  color: "white",
  padding: 8,
  paddingInline: 16,
};

const sectionMessageStyle: React.CSSProperties = {
  flex: 1,
  flexDirection: "column-reverse",
  overflowY: "scroll",
  padding: 16,
};

export default function ContentMessage() {
  return (
    <>
      <Title level={2}>Content</Title>
      <Flex style={sectionMessageStyle} gap={8}>
        <MessageCard content="hello" />
        <MessageCard content="Hello there" messageOut />
      </Flex>
      <Input
        placeholder="Enter your message"
        variant="filled"
        style={inputStyle}
      />
    </>
  );
}
