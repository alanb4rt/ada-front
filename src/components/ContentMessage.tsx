import { Flex, Typography } from "antd";

const { Title, Text } = Typography;

export default function ContentMessage() {
  return (
    <Flex vertical>
      <Title level={2}>Content</Title>
      <Text>Test</Text>
    </Flex>
  );
}
