import { Button, Divider, Flex, Form, Input, Typography } from 'antd'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import type { Login, Register } from '../models/Auth'
import {
  capsRule,
  containsNumberRule,
  containsSymbolRule,
  emailOrPhoneRule,
  emailRule,
  lowercaseRule,
  minLengthRule,
  phoneRule,
} from '../rules'

const { Title } = Typography

const AuthPage = () => {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinishSignup = (values: Register) => {
    register(values)
      .then(() => {
        navigate('/')
        form.resetFields()
      })
      .catch((error) => {
        console.error('Register failed:', error)
      })
  }

  const onFinishLogin = (values: Login) => {
    const formattedValues = { ...values }

    if (values.login) {
      if (values.login.includes('@')) {
        formattedValues.email = values.login
        delete formattedValues.phone
      } else {
        formattedValues.phone = values.login
        delete formattedValues.email
      }
      delete formattedValues.login
    }

    login(formattedValues)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.error('Login failed:', error)
      })
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

      <Flex gap={150} align="center" justify="center">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinishSignup}
          style={{ width: 300, color: 'white' }}
        >
          <Form.Item name="username" label="Username" required>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" required rules={[phoneRule()]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" required rules={[emailRule()]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            required
            rules={[
              capsRule(),
              lowercaseRule(),
              containsNumberRule(),
              containsSymbolRule(),
              minLengthRule(8),
            ]}
          >
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
          <Form.Item
            name="password"
            label="Password"
            required
            rules={[
              capsRule(),
              lowercaseRule(),
              containsNumberRule(),
              containsSymbolRule(),
              minLengthRule(8),
            ]}
          >
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
