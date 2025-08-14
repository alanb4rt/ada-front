import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Flex, Form, Input, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useGroup } from '../context/GroupContext'
import { emailOrPhoneRule } from '../rules'
import { createGroup, fetchGroups } from '../services/GroupService'
import GroupeCard from './GroupeCard'

const { Title } = Typography

const drawerBodyStyle: React.CSSProperties = {
  paddingInline: 0,
}

export default function SideBar() {
  const { logout, token } = useAuth()

  const [form] = Form.useForm()
  const contacts = Form.useWatch('users', form) || []

  const [open, setOpen] = useState<boolean>(false)
  const onFinishGroup = (values: any) => {
    const emails: string[] = []
    const phones: string[] = []

    values.users?.forEach((user: { login: string }) => {
      if (!user.login) return

      if (user.login.includes('@')) {
        emails.push(user.login)
      } else {
        phones.push(user.login)
      }
    })

    const formattedValues = {
      name: values.name,
      emails: emails.length > 0 ? emails : undefined,
      phones: phones.length > 0 ? phones : undefined,
    }

    createGroup(formattedValues, token || '')
      .then((res) => {
        console.log('Group created:', res)
        form.resetFields()
        setOpen(false)
      })
      .catch((err) => {
        console.error('Error creating group:', err)
      })
  }

  return (
    <Flex vertical style={{ height: '100vh' }}>
      <SideBarContent open={open} setOpen={setOpen} />
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
            <Form.Item
              name="name"
              label="Group name"
              rules={[{ required: true, message: 'Please enter a group name' }]}
            >
              <Input />
            </Form.Item>
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ marginBottom: 8 }}
                      align="baseline"
                    >
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
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add contact
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Button
              type="primary"
              htmlType="submit"
              disabled={contacts.length === 0}
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

interface Props {
  setOpen: (open: boolean) => void
  open: boolean
}

function SideBarContent({ setOpen, open }: Props) {
  const { token } = useAuth()
  const { setCurrentGroup, currentGroup } = useGroup()

  const [groups, setGroups] = useState<Array<any>>([])

  console.log(groups)

  useEffect(() => {
    if (open) return
    fetchGroups(token || '')
      .then((data) => {
        setGroups(data)
      })
      .catch((error) => {
        console.error('Error fetching groups:', error)
      })
  }, [open, token])

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
        {[...groups].reverse().map((group) => (
          <div onClick={() => setCurrentGroup(group)}>
            <GroupeCard
              key={group.id}
              users={group.users}
              groupName={group.name}
              active={currentGroup.id === group.id}
            />
          </div>
        ))}
      </Space>
    </>
  )
}
