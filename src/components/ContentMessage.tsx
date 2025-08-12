import { Flex, Input } from "antd";
import MessageCard from "./messageCard";

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
      <Flex style={sectionMessageStyle} gap={8}>
        <MessageCard content="hello" />
        <MessageCard content="Hello there" messageOut />
      </Flex>
      <Flex style={{ padding: 16 }}>
        <Input
          placeholder="Enter your message"
          variant="filled"
          style={inputStyle}
        />
      </Flex>
    </>
  );
}
