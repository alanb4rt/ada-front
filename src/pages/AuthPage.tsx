import { Form, Input, Button, Typography, Divider, Flex } from 'antd'
import { emailOrPhoneRule, emailRule, phoneRule } from '../rules'

const { Title } = Typography

const AuthPage = () => {
  const onFinishSignup = (values: any) => {
    console.log('Sign Up :', values)
  }

  const onFinishLogin = (values: any) => {
    console.log('Login :', values)
  }

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      gap={50}
      style={{
        backgroundColor: '#1e1e1e',
        width: '100%',
        height: '100vh',
      }}
    >
      <Title level={2} style={{ color: 'white' }}>
        ADA
      </Title>

      <Flex gap={150}>
        <Form
          layout="vertical"
          onFinish={onFinishSignup}
          style={{ width: 300, color: 'white' }}
        >
          <Form.Item name="phone" label="Phone" required rules={[phoneRule()]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" required rules={[emailRule()]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" required>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm password" required>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: 'red',
                borderColor: 'red',
                width: '100%',
              }}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <Divider
          type="vertical"
          style={{ height: '100%', borderColor: 'white' }}
        />

        <Form layout="vertical" onFinish={onFinishLogin} style={{ width: 300 }}>
          <Form.Item
            name="login"
            label="Phone / Email"
            required
            rules={[emailOrPhoneRule()]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" required>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: 'red',
                borderColor: 'red',
                width: '100%',
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  )
}

export default AuthPage
