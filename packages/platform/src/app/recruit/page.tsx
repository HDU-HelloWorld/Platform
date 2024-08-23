'use client'
import React from 'react'
import { Form, Input, Space, Button, Radio } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'
import useStores from '@/stores'

const FormItem = Form.Item
const RadioGroup = Radio.Group
export default function Recruit() {
  const [form] = Form.useForm()
  const { recuritStore } = useStores()

  return (
    <>
      <section className="h-full w-full flex flex-col items-center ">
        <Form
          form={form}
          layout="horizontal"
          requiredSymbol={false}
          size="large"
          autoComplete="off"
          className="!w-5/6  flex flex-col items-center justify-center "
          validateMessages={{
            required: (_, { label }) => `必须填写 ${label}`,
            string: {
              length: `字符数必须是 #{length}`,
              match: `不匹配正则 #{pattern}`,
            },
            number: {
              min: `最小值为 #{min}`,
              max: `最大值为 #{max}`,
            },
          }}
          onSubmit={(values: FormData) => {
            recuritStore.submitRecruitApply(values)
          }}>
          <FormItem label="姓名" field="username" required>
            <Input placeholder="请输入姓名" name="username" required />
          </FormItem>
          <FormItem
            label="学号"
            field="id"
            required
            rules={[{ match: /^\d{8}$/, message: '请输入正确的学号' }]}>
            <Input placeholder="请输入学号" name="id" type="number" required />
          </FormItem>
          <FormItem label="性别">
            <RadioGroup>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="邮箱" field="email">
            <Input type="email" placeholder="请输入邮箱" name="email" />
          </FormItem>
          <FormItem label="手机号" field="phone">
            <Input type="tel" placeholder="请输入手机号" name="phone" />
          </FormItem>
          <FormItem label="个人简介" field="bio">
            <Input.TextArea placeholder="介绍一下你自己吧~" name="bio" />
          </FormItem>
          <Form.Item label=" ">
            <Space size={24}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button
                onClick={() => {
                  form.resetFields()
                }}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </section>
    </>
  )
}
