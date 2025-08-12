import { Form, Input, Button, Typography, Divider, Space, Flex } from "antd";

const { Title } = Typography;

const AuthPage = () => {
  const onFinishSignup = (values) => {
    console.log("Sign Up :", values);
  };

  const onFinishLogin = (values) => {
    console.log("Login :", values);
  };

  return (
    <Flex
    vertical
    justify="center"
    align="center"
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        border: "1px solid #ccc",
        width: "100%",
        height: "100vh",
      }}
    >
      <Title level={2} style={{ color: "white" }}>
        ADA
      </Title>

      <Flex >
        <Form layout="vertical" onFinish={onFinishSignup} style={{ width: 300 }}>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "red",
                borderColor: "red",
                width: "100%",
              }}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <Divider type="vertical" style={{ height: "100%" }} />

        <Form layout="vertical" onFinish={onFinishLogin} style={{ width: 300 }}>
          <Form.Item name="login" label="Phone / Email">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "red",
                borderColor: "red",
                width: "100%",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};

export default AuthPage;
