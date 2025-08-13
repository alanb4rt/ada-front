import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Drawer, Flex, Form, Input, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import UserCard from './UserCard'
import type { SearchProps } from 'antd/es/input'
import { createGroup, fetchGroups } from '../services/GroupService'
import { emailOrPhoneRule, emailRule, phoneRule } from '../rules'

const { Text, Title } = Typography
const { Search } = Input;


const users = [
  { id: 1, name: 'Test', href: 'test' },
  { id: 2, name: 'Test', href: 'test' },
  { id: 3, name: 'Test', href: 'test' },
  { id: 4, name: 'Test', href: 'test' },
  { id: 5, name: 'Test', href: 'test' },
]

const drawerBodyStyle: React.CSSProperties = {
  paddingInline: 0,
}

export default function SideBar() {
  const { logout, token } = useAuth()
  const [form] = Form.useForm()

  const [open, setOpen] = useState<boolean>(false)
  const onFinishGroup = (values: any) => {
    const emails: string[] = [];
    const phones: string[] = [];

    values.users?.forEach((user: { login: string }) => {
      if (!user.login) return;

      if (user.login.includes('@')) {
        emails.push(user.login);
      } else {
        phones.push(user.login);
      }
    });

    const formattedValues = {
      name: values.name,
      emails: emails.length > 0 ? emails : undefined,
      phones : phones.length > 0 ? phones : undefined,
    };

    createGroup(formattedValues, token || '')
      .then((res) => {
        console.log('Group created:', res);
        form.resetFields();
        setOpen(false);
      })
      .catch((err) => {
        console.error('Error creating group:', err);
      });
  };




  return (
    <Flex vertical style={{ height: '100vh' }}>
      <SideBarContent value={{ setOpen, open }} />
      <Drawer
        title="New conversation"
        closeIcon={<ArrowLeftOutlined />}
        placement="left"
        width={255}
        onClose={() => setOpen(false)}
        open={open}
        mask={false}
        maskClosable={false}
        styles={{ body: drawerBodyStyle }}
      >
        <Space
          direction="vertical"
          size={16}
          style={{ width: '100%', flex: 1, overflowY: 'scroll' }}
        >
          <Form form={form} layout="vertical" onFinish={onFinishGroup}>
            <Form.Item name="name">
              <Input placeholder="Name of group" />
            </Form.Item>
            <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'login']}
                      label="Phone / Email"
                      required
                      rules={[emailOrPhoneRule()]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
              <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add contact
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
            
            <Button
              type="primary"
              htmlType="submit"
            >
              Create
            </Button>
          </Form>
        </Space>
      </Drawer>
      
      <Button style={{ height: 64 }} onClick={logout}>
        Logout
      </Button>
    </Flex>
  )
}

function SideBarContent({ value }: any) {
  const { token } = useAuth()
  const { setOpen, open } = value

  const [groups, setGroups] = useState<Array<any>>([])

  useEffect(() => {
    if (open) return
    fetchGroups(token || '').then((data) => {
      setGroups(data)
    }).catch((error) => {
      console.error('Error fetching groups:', error)
    })
  }, [open])

  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ position: 'relative', padding: 16 }}
      >
        <Title level={4} style={{ margin: 0 }}>
          ADA
        </Title>
        <PlusCircleOutlined
          style={{
            color: 'white',
            fontSize: '16px',
            position: 'absolute',
            right: 16,
          }}
          onClick={() => setOpen(true)}
        />
      </Flex>
      <Space
        direction="vertical"
        size={16}
        style={{ width: '100%', flex: 1, overflowY: 'scroll' }}
      >
        {[...groups].reverse().map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

      </Space>
    </>
  )
}
