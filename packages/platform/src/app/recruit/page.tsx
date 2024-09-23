'use client'
import React from 'react'
import {
  Form,
  Input,
  Space,
  Button,
  Message,
  Divider,
  Select,
  InputNumber
} from '@arco-design/web-react'

import useStores from '@/stores'
import { recuritTable } from '@/models/recurit.model'
import { College, collegeToMajors } from '@/models/collegeMajor.model'
import regexList from '@/utils/regex'
const FormItem = Form.Item
const Option = Select.Option
export default function Recruit() {
  const [form] = Form.useForm()
  const { recuritStore } = useStores()
  const departments = ['WEB', '后端', 'AI', '行政']

  const [selectedCollege, setSelectedCollege] = React.useState<College>()

  return (
    <>
      <section className="h-full w-full  max-w-md flex flex-col items-center ">
        <h1 className="text-3xl font-bold text-center mt-10">
          HelloWorld 招新报名表
        </h1>
        <Divider />
        <Form
          labelCol={{ span: 5, offset: 0 }}
          colon={true}
          form={form}
          layout="vertical"
          size="large"
          autoComplete="off"
          className="!w-5/6"
          validateMessages={{
            required: (_, { label }) => `必须填写 ${label}`,
            string: {
              length: `字符数必须是 #{length}`,
              match: `不匹配正则 #{pattern}`
            },
            number: {
              min: `最小值为 #{min}`,
              max: `最大值为 #{max}`
            }
          }}
          onValuesChange={(value) => {
            if (value['college']) {
              setSelectedCollege(value['college'] as College)
              form.setFieldValue('major', undefined)
            }
          }}
          initialValues={{ grade: '2024' }}
          onSubmit={(values: recuritTable) => {
            console.log(values)

            recuritStore.submitRecruitApply(values).then((res) => {
              console.log(res)

              if (res.code === 200) {
                Message.success('提交成功')
                form.resetFields()
              } else {
                Message.error(res?.msg)
              }
            })
          }}
        >
          <FormItem
            label="姓名"
            field="username"
            rules={[{ required: true }]}
            tooltip={{ content: '请输入姓名', position: 'top' }}
          >
            <Input placeholder="请输入姓名" name="username" />
          </FormItem>
          <FormItem
            label="学号"
            field="id"
            rules={[
              {
                required: true,
                match: /^\d{8}$/,
                message: '请输入正确的学号（8位数字）'
              }
            ]}
            tooltip={{ content: '请输入8位学号', position: 'top' }}
          >
            <InputNumber
              hideControl
              placeholder="请输入学号"
              name="id"
              type="tel"
            />
          </FormItem>
          <FormItem label="学院" field="college" rules={[{ required: true }]}>
            <Select placeholder="选择你的学院">
              {Object.values(College).map((option, index) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="专业"
            field="major"
            rules={[{ required: true }]}
            disabled={selectedCollege === undefined}
          >
            <Select placeholder="选择你的专业 ">
              {collegeToMajors[selectedCollege as College]?.map(
                (option, index) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                )
              )}
            </Select>
          </FormItem>
          <FormItem label="年级" field="grade" rules={[{ required: true }]}>
            <Input placeholder="请输入入学年份" type="tel" name="grade" />
          </FormItem>
          <FormItem label="QQ号" field="qqId" rules={[{ required: true }]}>
            <Input type="tel" placeholder="请输入QQ号" />
          </FormItem>
          <FormItem
            label="手机号"
            field="phone"
            rules={[
              {
                required: true,
                match: regexList.tel,
                message: '请输入中国大陆手机号（11位）'
              }
            ]}
          >
            <Input type="tel" placeholder="请输入手机号" name="phone" />
          </FormItem>

          <FormItem
            label="意愿部门"
            field="department"
            rules={[{ required: true, message: '请选择意愿部门' }]}
          >
            <Select placeholder="意愿部门">
              {departments.map((option, index) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="个人简介" field="bio" rules={[{ required: true }]}>
            <Input.TextArea placeholder="简单介绍一下自己吧~~" name="bio" />
          </FormItem>

          <Space size={24} className="">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
              }}
            >
              Reset
            </Button>
          </Space>
        </Form>
      </section>
    </>
  )
}
