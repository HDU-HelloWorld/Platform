'use client'
//QR code scanner 签到’
import { Form, InputNumber, Input } from '@arco-design/web-react'
const FormItem = Form.Item

export default function SignIn() {
  return (
    <>
      <Form>
        <FormItem>
          <InputNumber placeholder="请输入你的学号" />
        </FormItem>
      </Form>
    </>
  )
}
